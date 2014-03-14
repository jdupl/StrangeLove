package analytics.data;

public class MinerInfo {

	private int serverId;
	private int uptime;
	private float loadAvg;

	public int getServerId() {
		return serverId;
	}

	public void setServerId(int serverId) {
		this.serverId = serverId;
	}

	public int getUptime() {
		return uptime;
	}

	public void setUptime(int uptime) {
		this.uptime = uptime;
	}

	public void setLoadAvg(float avg) {
		this.loadAvg = avg;
	}

	public float getLoadAvg() {
		return this.loadAvg;
	}

}
