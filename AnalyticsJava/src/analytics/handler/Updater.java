package analytics.handler;

import java.util.ArrayList;

import analytics.data.ApiResult;

public class Updater implements Runnable {

	ArrayList<ApiResult> toProcess;
	
	
	public Updater(ArrayList<ApiResult> results) {
		this.toProcess = results;
	}
	
	@Override
	public void run() {
		System.out.printf("Updating %d miner info", this.toProcess.size());
		
	}

}
