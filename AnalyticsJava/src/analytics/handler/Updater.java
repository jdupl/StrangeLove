package analytics.handler;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

import analytics.data.ApiResult;
import analytics.data.GpuInfo;
import analytics.data.MinerInfo;

/**
 * This class will process basic analysis and insert the data given by the api.
 * 
 * @author Justin Duplessis
 * 
 */
public class Updater implements Runnable {

	ArrayList<ApiResult> toProcess;

	public Updater(ArrayList<ApiResult> results) {
		this.toProcess = results;
	}

	public synchronized Connection getConnection() throws SQLException {
		Connection conn = null;
		Properties connProps = new Properties();
		connProps.put("user", "strangelove");
		connProps.put("password", "strangelove");
		conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/", connProps);
		return conn;
	}

	@Override
	public void run() {

		for (ApiResult apiData : toProcess) {
			processApiResult(apiData);
		}
	}

	/**
	 * Processes an ApiResult.
	 * 
	 * @param apiData
	 *            The apiresult to deal with
	 * @return success
	 */
	public boolean processApiResult(ApiResult apiData) {
		System.out.printf("Processing server %d \n", apiData.minerInfo.getServerId());
		for (GpuInfo info : apiData.gpusInfo) {
			updateGpuInfo(info);
		}
		updateMinerInfo(apiData.minerInfo);
		return true;
	}

	public boolean updateMinerInfo(MinerInfo now) {
		// TODO insert new Record in DB
		return true;
	}

	/**
	 * Calculates shares since last record and inserts into the database.
	 * 
	 * @param now
	 *            The gpuinfo from the api
	 * @return Succes of the insert in the database
	 */
	public boolean updateGpuInfo(GpuInfo now) {
		System.out.printf("Processing gpu %d\n", now.cardId);
		GpuInfo lastRecord = getLastRecordGpu(now);

		if (lastRecord == null) {
			// this condition should only happen the first time a gpu is queried.
			System.out.println("no last record");
			now.validSharedSinceLast = now.sharesAccepted;
			now.invalidSharedSinceLast = now.sharesRefused;
		} else if (lastRecord.timestamp > now.timestamp) {
			System.out.println("Disruption in the space–time continuum detected !");
			// TODO handle space–time continuum disruption
			// Should never happen. Most likely, a time zone problem is the problem of this condition.
		} else if (lastRecord.sharesAccepted <= now.sharesAccepted) {
			// calculate shares since last record
			// this should be the normal condition
			now.validSharedSinceLast = now.sharesAccepted - lastRecord.sharesAccepted;
			now.invalidSharedSinceLast = now.sharesRefused - lastRecord.sharesRefused;
		} else {
			// Should happen from time to time. Only when the miner just rebooted.
			// TODO check with miner info the uptime of the server ? (nice to have)
			System.out.println("The card last's record does not make sense. Assuming server rebooted.");
			now.validSharedSinceLast = now.sharesAccepted;
			now.invalidSharedSinceLast = now.sharesRefused;
		}

		return insertGpuRecord(now);
	}

	public boolean insertGpuRecord(GpuInfo info) {
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
			// TODO Auto-generated catch block
			e.printStackTrace();
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
	public GpuInfo getLastRecordGpu(GpuInfo now) {
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
			e.printStackTrace();
		}
		return lastInfo;
	}

	public MinerInfo getLastRecordServer(int serverId) {
		MinerInfo info = new MinerInfo();
		// TODO query mysql
		return info;
	}

}
