package analytics;

import org.json.simple.JSONObject;

public class GpuInfo {

	public int cardId;
	public int timestamp;
	public int totalShares;

	public GpuInfo(JSONObject object) {
		// TODO fully process json object and store in java object the fields
		System.out.println(object.get(Keys.CURRENT_HASH_RATE));
	}

}
