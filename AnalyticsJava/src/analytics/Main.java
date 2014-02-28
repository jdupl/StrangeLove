package analytics;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

/**
 * Calls a list of miners from a DB and inserts the miners' status in the DB.
 * Converts total number of shares to "shares since last" to simplify data
 * processing afterwards.
 * 
 * @author Justin Duplessis
 * @version dev
 * 
 */
public class Main {

	public static void main(String[] args) {
		callApi("127.0.0.1", 1337);
	}

	public static boolean dealWithGPU(GpuInfo info) {

		// this code is only here for the future implementation principle

		Record lastRecord = getLastRecord(info.cardId, 5000);

		int minedSinceLast = info.totalShares;
		// If this card has an old record and total was not reset
		if (lastRecord != null && info.totalShares > lastRecord.totalShares) {
			minedSinceLast = info.totalShares - lastRecord.totalShares;
		}
		Record now = new Record();
		now.cardId = info.cardId;
		now.timestamp = info.timestamp;
		now.totalShares = info.totalShares;
		now.mined = minedSinceLast;

		updateServerInfo(now);
		return true;
	}

	public static boolean updateServerInfo(Record now) {
		// TODO insert new Record in DB
		return true;
	}

	public static ApiResult callApi(String ip, int port) {

		ApiResult result = new ApiResult();

		URL url = null;
		try {
			url = new URL("http", ip, port, "");
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
				if (json.containsKey(Keys.GPUS_STATUS)) {
					JSONArray gpus = (JSONArray) json.get(Keys.GPUS_STATUS);
					for (Object object : gpus) {
						// the constructor handles the main json parsing
						result.gpusInfo.add(new GpuInfo((JSONObject) object));
					}
				}
				if (json.containsKey(Keys.SERVER_STATUS)
						&& json.containsKey(Keys.SERVER_ID)) {

					ServerInfo server = new ServerInfo();
					server.setServerId((int) json.get(Keys.SERVER_ID));
					// TODO handle server info (load average, uptime)
					result.serverInfo = server;
				}
				if (json.containsKey(Keys.TIMESTAMP)) {
					result.timestamp = (int) json.get(Keys.TIMESTAMP);
				}
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return result;
	}

	public static Record getLastRecord(int cardId, int timestampNow) {
		Record r = new Record();
		r.cardId = 0;
		r.mined = 2;
		r.timestamp = 0;
		r.totalShares = 2;
		return r;
	}

}
