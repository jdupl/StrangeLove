package analytics.handler;

import java.util.ArrayList;

import analytics.Dal;
import analytics.constants.Errors;
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
		Dal.insertMinerInfo(apiData.minerInfo);
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
		GpuInfo lastRecord = Dal.getLastRecordGpu(now);

		if (lastRecord == null) {

			// this condition should only happen the first time a gpu is queried.
			Dal.log(Errors.NO_LAST_RECORD, "Adding first record of gpu with id" + now.cardId);
			now.validSharedSinceLast = now.sharesAccepted;
			now.invalidSharedSinceLast = now.sharesRefused;

		} else if (lastRecord.timestamp > now.timestamp) {

			// TODO handle space–time continuum disruption
			// Should never happen. Most likely, a time zone problem is the problem of this condition.
			Dal.log(Errors.TIME_DISRUPTION, "Disruption in the space–time continuum detected !");

		} else if (lastRecord.sharesAccepted <= now.sharesAccepted) {

			// calculate shares since last record
			// this should be the normal condition
			now.validSharedSinceLast = now.sharesAccepted - lastRecord.sharesAccepted;
			now.invalidSharedSinceLast = now.sharesRefused - lastRecord.sharesRefused;

		} else {

			// Should happen from time to time. Only when the miner just rebooted.
			// TODO check with miner info the uptime of the server ? (nice to have)
			Dal.log(Errors.MINER_REBOOTED, "gpu with id " + now.cardId + " rebooted");
			now.validSharedSinceLast = now.sharesAccepted;
			now.invalidSharedSinceLast = now.sharesRefused;

		}

		return Dal.insertGpuRecord(now);
	}

	public MinerInfo getLastRecordServer(int serverId) {
		MinerInfo info = new MinerInfo();
		// TODO query mysql
		return info;
	}

}
