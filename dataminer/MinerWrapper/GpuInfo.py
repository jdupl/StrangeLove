import os
import json
import time
from MinerKeys import *
from CommonKeys import *
import ServerInfo

ServerInfo = ServerInfo.ServerInfo()

class GpuInfo():


    def processDevs(self, devs):
        devs_json = []
        for dev in devs:
            devs_json.append(self.processDev(dev))
        return devs_json

    def processDev(self, dev):
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
        dev_json[CommonKeys.CURRENT_HASH_RATE] = dev[MinerKeys.CURRENT_HASH_RATE]
        dev_json[CommonKeys.INTENSITY] = dev[MinerKeys.INTENSITY]
        return dev_json