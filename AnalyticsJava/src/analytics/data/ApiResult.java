package analytics.data;

import java.util.ArrayList;

public class ApiResult {
	public ArrayList<GpuInfo> gpusInfo;
	public MinerInfo minerInfo;
	public int timestamp;

	public ApiResult() {
		this.gpusInfo = new ArrayList<>();
	}
}
