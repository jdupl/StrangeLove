package analytics;

import java.util.ArrayList;
import java.util.Observable;
import java.util.Observer;

import analytics.data.ApiResult;
import analytics.data.Miner;
import analytics.handler.Updater;

public class Core extends Thread implements Observer {

	public Core() {

	}

	/**
	 * When ran, the core gets the current list of active servers to query from MySql and calls the dispatcher.
	 */
	public void run() {
		Dispatcher dispatcher = new Dispatcher(getMinerList());
		dispatcher.addObserver(this);
		Thread t = new Thread(dispatcher);
		t.start();
	}

	/**
	 * Gets a list of miners to query from the database
	 * 
	 * @return The list of servers to query
	 */
	private synchronized ArrayList<Miner> getMinerList() {

		return Dal.getMinerList();
	}

	@Override
	public void update(Observable o, Object r) {
		// Remove nulls and invalid objects
		ArrayList<ApiResult> results = new ArrayList<>();
		for (Object result : (ArrayList<?>) r) {
			if (result != null && result instanceof ApiResult) {
				results.add((ApiResult) result);
			}
		}
		// Send the clean list to an updater thread
		Updater updater = new Updater(results);
		Thread t = new Thread(updater);
		t.start();
	}

}
