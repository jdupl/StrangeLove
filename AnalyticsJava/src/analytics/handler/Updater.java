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
			updateGpuInfo(info, apiData.timestamp);
		}
		updateMinerInfo(apiData.minerInfo);
		return true;
	}

	public boolean updateMinerInfo(MinerInfo now) {
		// TODO insert new Record in DB
		return true;
	}

	public boolean updateGpuInfo(GpuInfo now, int timestamp) {
		System.out.printf("Processing gpu %d\n", now.cardId);
		GpuInfo lastRecord = getLastRecordGpu(now);
		if (lastRecord == null) {
			System.out.println("no last record");
			now.validSharedSinceLast = now.sharesAccepted;
			now.invalidSharedSinceLast = now.sharesRefused;
		} else {
			//TODO calculate shares since last and insert
		}
		return true; // TODO real return
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
			PreparedStatement ps = conn
					.prepareStatement("SELECT * FROM strangelove.stats WHERE device_id = ? ORDER BY timestamp DESC");
			ps.setInt(1, now.cardId);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				lastInfo = new GpuInfo();
				lastInfo.timestamp = rs.getInt("timestamp");
				lastInfo.sharesAccepted = rs.getInt("shares_accepted");
				lastInfo.sharesRefused = rs.getInt("shares_refused");
			}
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
