package analytics;


/**
 * Calls a list of miners from a DB and inserts the miners' status in the DB. Converts total number of shares to
 * "shares since last" to simplify data processing afterwards.
 * 
 * Maximum line length is 120.
 * 
 * @author Justin Duplessis
 * @version dev
 * 
 */
public class Main {

	public static void main(String[] args) {
		Core c = new Core();
		c.start();
	}



}
