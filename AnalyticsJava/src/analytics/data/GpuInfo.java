package analytics.data;

import org.json.simple.JSONObject;

import analytics.Dal;
import analytics.constants.Errors;
import analytics.constants.Keys;

public class GpuInfo {

	public int cardId;
	public int timestamp;
	public float temperature;
	public float voltage;
	public int coreClock;
	public int memClock;
	public int fanRpm;
	public int hwErrors;
	public int sharesAccepted;
	public int sharesRefused;
	public int currentHashRate;
	public int intensity;
	public int timeSinceLastWork;
	public int timeSinceLastValidWork;

	public int validSharedSinceLast;
	public int invalidSharedSinceLast;

	public GpuInfo() {

	}

	public GpuInfo(JSONObject object, int timestamp) {

		this.timestamp = timestamp;

		try {
			this.cardId = ((Long) object.get(Keys.GPU_ID)).intValue();
			this.temperature = ((Double) object.get(Keys.TEMPERATURE)).floatValue();
			this.voltage = ((Double) object.get(Keys.GPU_VOLTAGE)).floatValue();
			this.coreClock = ((Long) object.get(Keys.GPU_CLOCK)).intValue();
			this.memClock = ((Long) object.get(Keys.MEM_CLOCK)).intValue();
			this.fanRpm = ((Long) object.get(Keys.FAN_RPM)).intValue();
			this.hwErrors = ((Long) object.get(Keys.HW_ERRORS)).intValue();
			this.sharesAccepted = ((Long) object.get(Keys.ACCEPTED)).intValue();
			this.sharesRefused = ((Long) object.get(Keys.REJECTED)).intValue();
			this.currentHashRate = ((Long) object.get(Keys.CURRENT_HASH_RATE)).intValue();
			this.intensity = ((Long) object.get(Keys.INTENSITY)).intValue();
			this.timeSinceLastWork = ((Long) object.get(Keys.TIME_SINCE_LAST_WORK)).intValue();
			this.timeSinceLastValidWork = ((Long) object.get(Keys.TIME_SINCE_LAST_VALID_WORK)).intValue();

		} catch (NullPointerException e) {
			Dal.log(Errors.RESPONSE_MISSING_KEY, "Bad object received from miner wrapper");
		}

	}
}
