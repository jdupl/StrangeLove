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
	public synchronized ArrayList<Miner> getMinerList() {
		ArrayList<Miner> miners = new ArrayList<>();
		Dal.getMinerList();
		Miner m = new Miner();
		m.serverId = 0;
		m.address = "127.0.0.1";
		m.port = 1337;

		miners.add(m);

		Miner m2 = new Miner();
		m2.serverId = 0;
		m2.address = "127.0.0.1";
		m2.port = 1338;

		miners.add(m2);

		return miners;
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
