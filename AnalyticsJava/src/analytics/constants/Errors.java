package analytics.constants;

public enum Errors {
	OK(ErrorCodes.OK, LogLevels.DEBUG),
	BAD_CGMINER(ErrorCodes.BAD_CGMINER, LogLevels.ERR),
	NO_CGMINER(ErrorCodes.NO_CGMINER, LogLevels.ERR),
	CONFIG_ERROR(ErrorCodes.CONFIG_ERROR, LogLevels.ALERT),
	TIME_DISRUPTION(ErrorCodes.TIME_DISRUPTION, LogLevels.ERR),
	MINER_TIMEOUT(ErrorCodes.MINER_TIMEOUT, LogLevels.ERR),
	NO_LAST_RECORD(ErrorCodes.NO_LAST_RECORD, LogLevels.INFO),
	MINER_REBOOTED(ErrorCodes.MINER_REBOOTED, LogLevels.INFO),
	UNEXPECTED_SERVER_ID(ErrorCodes.UNEXPECTED_SERVER_ID, LogLevels.WARN),
	RESPONSE_MISSING_KEY(ErrorCodes.RESPONSE_MISSING_KEY, LogLevels.ALERT),
	UNKNOWN(ErrorCodes.UNKNOWN, LogLevels.EMERG);
	

	Errors(byte code, byte level) {
		this.errorCode = code;
		this.logLevel = level;
	}

	public byte errorCode;
	public byte logLevel;

}

