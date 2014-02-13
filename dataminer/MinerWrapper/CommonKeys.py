

class CommonKeys():
    GPU_ID = "device_id" #string 
    TEMPERATURE = "temperature" #float
    GPU_VOLTAGE = "device_voltage" #float
    GPU_CLOCK = "engine_clock" #int
    MEM_CLOCK = "memory_clock" #int
    FAN_RPM = "fan_rpm" #int
    HW_ERRORS = "hardware_errors" #int
    REJECTED = "shares_rejected" #int
    ACCEPTED = "shares_accepted" #int
    CURRENT_HASH_RATE = "hashrate" # int (hashrate in kh/s)
    INTENSITY = "intensity" #int
    TIME_SINCE_LAST_WORK = "time_since_last_work" #int (seconds)
    TIME_SINCE_LAST_VALID_WORK = "time_since_last_valid_work" #int (seconds)
    
    TIMESTAMP = "timestamp" # int current ms of the server
    SERVER_ID = "server_id" # String 
    SERVER_STATUS = "server_status" # array of dictionnaries
    UPTIME = "uptime" # int (seconds)
    LOAD_AVG = "load_avg" # array of float (unix timing format)
    GPUS_STATUS = "gpus_status" # array of gpu status