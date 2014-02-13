from CommonKeys import *
from MinerKeys import *
import ServerInfo


ServerInfo = ServerInfo.ServerInfo()

class GpuInfo():


    def processDevs(self, devs, time):
        devs_json = []
        for dev in devs:
            devs_json.append(self.processDev(dev, time))
        return devs_json

    def processDev(self, dev, time):
        dev_json = {}
        dev_json[CommonKeys.GPU_ID] = ServerInfo.getGPUGlobalId(dev[MinerKeys.GPU_ID])
        dev_json[CommonKeys.TEMPERATURE] = dev[MinerKeys.TEMPERATURE]
        dev_json[CommonKeys.GPU_VOLTAGE] = dev[MinerKeys.GPU_VOLTAGE]
        dev_json[CommonKeys.GPU_CLOCK] = dev[MinerKeys.GPU_CLOCK]
        dev_json[CommonKeys.MEM_CLOCK] = dev[MinerKeys.MEM_CLOCK]
        dev_json[CommonKeys.FAN_RPM] = dev[MinerKeys.FAN_RPM]
        dev_json[CommonKeys.HW_ERRORS] = dev[MinerKeys.HW_ERRORS]
        dev_json[CommonKeys.REJECTED] = dev[MinerKeys.REJECTED]
        dev_json[CommonKeys.ACCEPTED] = dev[MinerKeys.ACCEPTED]
        dev_json[CommonKeys.CURRENT_HASH_RATE] = int(dev[MinerKeys.CURRENT_HASH_RATE] * 1000)
        dev_json[CommonKeys.INTENSITY] = int(dev[MinerKeys.INTENSITY])
        dev_json[CommonKeys.TIME_SINCE_LAST_WORK] = time - dev[MinerKeys.LAST_WORK_TIME]
        dev_json[CommonKeys.TIME_SINCE_LAST_VALID_WORK] = time - dev[MinerKeys.LAST_VALID_WORK_TIME]
        return dev_json