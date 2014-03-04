package analytics;

import java.util.ArrayList;

import analytics.data.ApiResult;
import analytics.data.Miner;

/**
 * Queries the list of server given in the constructor in different threads and returns a list of apiReturns
 * 
 * @author Justin Duplessis
 * 
 */

public class Dispatcher extends Thread {

	public Core callback;
	private ArrayList<ApiResult> results;
	private ArrayList<Miner> miners;

	public Dispatcher(ArrayList<Miner> miners, Core callback) {
		this.miners = miners;
		this.results = new ArrayList<>();
		this.callback = callback;
	}

	/**
	 * If the result given is valid, adds it to the list. Otherwise, an empty record is added to the list (in case of
	 * timeout). Checks if all threads called back and calls Main back if so.
	 * 
	 * @param result
	 * @param serverId
	 * @return
	 */
	public synchronized boolean addResult(ApiResult result, Miner miner) {
		boolean added = false;
		if (result == null) {
			result = new ApiResult();
			// TODO provide false miner information
			System.out.printf("Miner at %s port %d returned INVALID result.\n", miner.address, miner.port);
		} else {
			System.out.printf("Miner at %s port %d returned valid result.\n", miner.address, miner.port);
		}
		added = this.results.add(result);
		if (this.miners.size() == this.results.size()) {
			// all threads called back !
			System.out.println("All client threads reported back to dispatcher thread!");
			this.callback.callback(results);
			System.out.println("ok");
		}

		return added;
	}

	public void run() {

		for (Miner miner : this.miners) {
			Client c = new Client(miner, this);
			c.start();
		}
	}
}
