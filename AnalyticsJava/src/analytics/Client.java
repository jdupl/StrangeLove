package analytics;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Observable;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import analytics.constants.ErrorCodes;
import analytics.constants.Errors;
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
		boolean validCall = false;

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
					validCall = true;
					break;
				case ErrorCodes.BAD_CGMINER:
					Dal.log(Errors.BAD_CGMINER, "Bad return code from cgminer at ip " + this.miner.address + " port "
							+ this.miner.port);
					break;
				case ErrorCodes.CONFIG_ERROR:
					Dal.log(Errors.CONFIG_ERROR, "Bad wrapper config at ip " + this.miner.address + " port "
							+ this.miner.port);
					break;
				case ErrorCodes.NO_CGMINER:
					Dal.log(Errors.NO_CGMINER, "Wrapper could not contact cgminer at ip " + this.miner.address
							+ " port " + this.miner.port);
					break;
				case ErrorCodes.UNKNOWN:
					Dal.log(Errors.UNKNOWN, "Wrapper found unknown error at ip " + this.miner.address + " port "
							+ this.miner.port);
				default:
					// TODO throw unsupported status from the api error
					Dal.log(Errors.UNKNOWN, "Unknown return code from wrapper at ip " + this.miner.address + " port "
							+ this.miner.port);
					break;
				}

				result = new ApiResult();

				int uptime = 0;
				Double load = 0.0;

				if (!validCall) {
					return result;
				}

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
					result.minerInfo = miner;

					if (this.miner.serverId != result.minerInfo.getServerId()) {
						Dal.log(Errors.UNEXPECTED_SERVER_ID, "Expected server id:" + this.miner.serverId + ""
								+ " but got: " + result.minerInfo.getServerId() + "at ip " + this.miner.address
								+ " port " + this.miner.port);
					}

					Object o = ((JSONObject) json.get(Keys.SERVER_STATUS)).get(Keys.LOAD_AVG);
					ArrayList<?> loadAvgs = (ArrayList<?>) o;
					if (loadAvgs.size() == 3 && loadAvgs.get(1) instanceof Double) {
						load = (Double) loadAvgs.get(1);

					}

					result.minerInfo.setLoadAvg((Float) load.floatValue());

					uptime = ((Long) ((JSONObject) json.get(Keys.SERVER_STATUS)).get(Keys.UPTIME)).intValue();

					result.minerInfo.setUptime(uptime);
				}

			}
		} catch (MalformedURLException e) {
			// Should never happen
			e.printStackTrace();
		} catch (IOException e) {
			Dal.log(Errors.MINER_TIMEOUT, "Could not reach miner at ip " + this.miner.address + " port "
					+ this.miner.port);
		}

		return result;
	}
}
