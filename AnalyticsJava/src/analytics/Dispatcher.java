package analytics;

import java.util.ArrayList;
import java.util.Observable;
import java.util.Observer;

import analytics.data.ApiResult;
import analytics.data.Miner;

/**
 * Queries the list of server given in the constructor in different threads and returns a list of apiReturns
 * 
 * @author Justin Duplessis
 * 
 */

public class Dispatcher extends Observable implements Observer, Runnable {

	private ArrayList<ApiResult> results;
	private ArrayList<Miner> miners;

	public Dispatcher(ArrayList<Miner> miners) {
		this.miners = miners;
		this.results = new ArrayList<>();
	}

	/**
	 * If the result given is valid, adds it to the list. Otherwise, an empty record is added to the list (in case of
	 * timeout). Checks if all threads called back and notifies Core if so.
	 * 
	 * @return
	 */
	public synchronized boolean addResult(ApiResult result) {
		boolean added = false;

		added = this.results.add(result);
		if (this.miners.size() == this.results.size()) {
			// all threads called back !
			System.out.println("All client threads reported back to dispatcher thread!");
			setChanged();
			notifyObservers(this.results);
		}

		return added;
	}

	public void run() {
		System.out.println("Querying all miners and waiting for all responses before processing data.");
		for (Miner miner : this.miners) {
			Client c = new Client(miner);
			c.addObserver(this);
			Thread t = new Thread(c);
			t.start();
		}
	}

	@Override
	public void update(Observable o, Object r) {
		addResult((ApiResult) r);
	}
}
