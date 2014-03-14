package analytics;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Properties;

import analytics.constants.Errors;
import analytics.data.GpuInfo;
import analytics.data.Miner;
import analytics.data.MinerInfo;

public class Dal {

	/**
	 * Connects a default localhost database
	 * 
	 * @return the sql connection
	 * @throws SQLException
	 *             Could not login/got a timeout
	 */
	private static Connection getConnection() throws SQLException {
		Connection conn = null;
		Properties connProps = new Properties();
		connProps.put("user", "strangelove");
		connProps.put("password", "strangelove");
		conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/", connProps);
		return conn;
	}

	public static void log(Errors e, String message) {
		log(e.errorCode, message, e.logLevel);
	}

	/**
	 * Tries to log in SQL table 'log'
	 * 
	 * @param code
	 *            The error code
	 * @param message
	 *            The error message
	 * @param level
	 *            The level of importance of this error
	 */
	public static void log(byte code, String message, byte level) {

		long timestamp = System.currentTimeMillis();
		Connection conn = null;

		try {
			conn = getConnection();
			PreparedStatement ps = conn.prepareStatement("insert into strangelove.log"
					+ " (timestamp, error_code, level, error_message " + ") values ( ?, ?, ?, ?)");
			ps.setLong(1, timestamp);
			ps.setByte(2, code);
			ps.setByte(3, level);
			ps.setString(4, message);
			ps.execute();
		} catch (SQLException e) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
			System.err.printf("[%s] Could not log to mysql !"
					+ " Error code: %d Log level: %d Orignal error message: %s Sql log exception : %s\n", sdf.toString(),
					code, level, message, e.getMessage());
		}
	}

	public static boolean insertMinerInfo(MinerInfo now, int timestamp) {
		Connection conn = null;
		boolean succes = false;
		try {
			conn = getConnection();
			PreparedStatement ps = conn.prepareStatement("insert into strangelove.stats_machines"
					+ " (machine_id, timestamp, uptime, load_avg" + ") values ( ?, ?, ?, ?)");
			ps.setInt(1, now.getServerId());
			ps.setInt(2, timestamp);
			ps.setInt(3, now.getUptime());
			ps.setFloat(4, now.getLoadAvg());
			succes = ps.execute();
		} catch (SQLException e) {
			Dal.log(Errors.SQL_ERROR, e.getMessage());
		}

		return succes;
	}

	/**
	 * Gets the list of miner to contact from the database. Returns empty arraylist if no result or error.
	 * 
	 * @return An arraylist<Miner>
	 */
	public static ArrayList<Miner> getMinerList() {
		ArrayList<Miner> miners = new ArrayList<>();
		Connection conn = null;
		try {
			conn = getConnection();
			PreparedStatement ps = conn.prepareStatement("select * from strangelove.machines");
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Miner m = new Miner();
				m.serverId = rs.getInt("id");
				m.name = rs.getString("name");
				m.address = rs.getString("ip_address");
				m.port = rs.getInt("port");
				miners.add(m);
			}

		} catch (SQLException e) {
			Dal.log(Errors.SQL_ERROR, e.getMessage());
		}

		return miners;
	}

	public static boolean insertGpuRecord(GpuInfo info) {
		boolean succes = false;
		Connection conn = null;
		try {
			conn = getConnection();
			PreparedStatement ps = conn.prepareStatement("INSERT INTO strangelove.stats (timestamp, device_id,"
					+ " temperature, device_voltage, engine_clock, memory_clock, fan_rpm,"
					+ " hardware_errors, shares_rejected, shares_accepted, hashrate, intensity,"
					+ " time_since_last_work, time_since_last_valid_work, shares_since_last_record,"
					+ " invalid_shares_since_last_record ) VALUES  ("
					+ "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
			ps.setInt(1, info.timestamp);
			ps.setInt(2, info.cardId);
			ps.setFloat(3, info.temperature);
			ps.setFloat(4, info.voltage);
			ps.setInt(5, info.coreClock);
			ps.setInt(6, info.memClock);
			ps.setInt(7, info.fanRpm);
			ps.setInt(8, info.hwErrors);
			ps.setInt(9, info.sharesRefused);
			ps.setInt(10, info.sharesAccepted);
			ps.setInt(11, info.currentHashRate);
			ps.setInt(12, info.intensity);
			ps.setInt(13, info.timeSinceLastWork);
			ps.setInt(14, info.timeSinceLastValidWork);
			ps.setInt(15, info.validSharedSinceLast);
			ps.setInt(16, info.invalidSharedSinceLast);
			succes = ps.execute();

		} catch (SQLException e) {
			Dal.log(Errors.SQL_ERROR, e.getMessage());
		}

		return succes;
	}

	/**
	 * Returns minimal information about the last record of the gpu (id) given to calculate shares since last record.
	 * 
	 * @param now
	 *            The GpuInfo with the id to query in the database
	 * @return GpuInfo with only timestamp, sharesAccepted and sharesRefused
	 */
	public static GpuInfo getLastRecordGpu(GpuInfo now) {
		GpuInfo lastInfo = null;
		Connection conn = null;
		try {
			conn = getConnection();
			PreparedStatement ps = conn.prepareStatement("SELECT * FROM strangelove.stats" + " WHERE device_id = ? "
					+ "ORDER BY timestamp DESC");
			ps.setInt(1, now.cardId);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				lastInfo = new GpuInfo();
				lastInfo.timestamp = rs.getInt("timestamp");
				lastInfo.sharesAccepted = rs.getInt("shares_accepted");
				lastInfo.sharesRefused = rs.getInt("shares_rejected");
			}
			rs.close();
			conn.close();
		} catch (SQLException e) {
			Dal.log(Errors.SQL_ERROR, e.getMessage());
		}
		return lastInfo;
	}
}
