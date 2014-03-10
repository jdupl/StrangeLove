package analytics;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Observable;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import analytics.constants.ErrorCodes;
import analytics.constants.Keys;
import analytics.data.ApiResult;
import analytics.data.GpuInfo;
import analytics.data.Miner;
import analytics.data.MinerInfo;

/**
 * Thread that calls the api of the miner given in the constructor.
 * 
 * @author Justin Duplessis
 * 
 */

public class Client extends Observable implements Runnable {

	private Miner miner;

	public Client(Miner miner) {
		this.miner = miner;
	}

	public void run() {
		System.out.printf("Querying miner at address %s port %d\n", this.miner.address, this.miner.port);
		ApiResult result = null;
		result = callApi();
		setChanged();
		notifyObservers(result);
	}

	public ApiResult callApi() {

		ApiResult result = null;

		URL url = null;
		try {
			url = new URL("http", this.miner.address, this.miner.port, "");
			Scanner scanner = new Scanner(url.openStream());
			String response = scanner.useDelimiter("\\Z").next();
			scanner.close();
			JSONObject json = (JSONObject) JSONValue.parse(response);

			if (json.containsKey(Keys.REQUEST_STATUS)) {
				long status = (long) json.get(Keys.REQUEST_STATUS);

				switch ((int) status) {
				case ErrorCodes.OK:
					// response looks ok
					break;
				case ErrorCodes.BAD_CGMINER:
					// TODO log
					break;
				case ErrorCodes.CONFIG_ERROR:
					// TODO log
					break;
				case ErrorCodes.NO_CGMINER:
					// TODO log
					break;
				case ErrorCodes.UNKNOWN:
					// TODO log
				default:
					// TODO throw unsupported status from the api error
					break;
				}

				result = new ApiResult();

				if (json.containsKey(Keys.TIMESTAMP)) {
					result.timestamp = ((Long) json.get(Keys.TIMESTAMP)).intValue();
				}

				if (json.containsKey(Keys.GPUS_STATUS)) {
					JSONArray gpus = (JSONArray) json.get(Keys.GPUS_STATUS);
					for (Object object : gpus) {
						// the constructor handles the main json parsing
						result.gpusInfo.add(new GpuInfo((JSONObject) object, result.timestamp));
					}
				}
				if (json.containsKey(Keys.SERVER_STATUS) && json.containsKey(Keys.SERVER_ID)) {

					MinerInfo miner = new MinerInfo();
					miner.setServerId(((Long) json.get(Keys.SERVER_ID)).intValue());
					// TODO handle server info (load average, uptime)
					result.minerInfo = miner;
					if (this.miner.serverId != result.minerInfo.getServerId()) {
						// TODO log
					}
				}

			}
		} catch (MalformedURLException e) {
			// Should never really happen, but
			// TODO: log error
			e.printStackTrace();
		} catch (IOException e) {
			System.out.printf("Miner at %s port %d Timed out\n", miner.address, miner.port);
			// TODO: handle timeout
		}

		return result;
	}
}
