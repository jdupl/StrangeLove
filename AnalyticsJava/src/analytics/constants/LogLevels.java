package analytics.constants;

public class LogLevels {
	public static final byte EMERG = 0, // internal error
			ALERT = 1, // Action must be taken immediately
			CRIT = 2, // Information integrity is threatened
			ERR = 3, // Direct information loss occurred (server not reachable)
			WARN = 4, // Warning indicating a *possible* fault or data corruption
			NOTICE = 5,// An event trace that can change data collection (server rebooted)
			INFO = 6, // normal information
			DEBUG = 7; // debugging info (use only in debug)

}
