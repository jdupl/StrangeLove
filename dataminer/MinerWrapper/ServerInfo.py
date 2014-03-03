import json
import os
import sys

from CommonKeys import *


class ServerInfo():

    def getUptime(self):
        if not sys.platform.startswith('linux'):
            return -1
        with open('/proc/uptime', 'r') as f:
            return int(float(f.readline().split()[0]))


    def getLoadAvg(self):
        if not sys.platform.startswith('linux'):
            return [-1, -1, -1]
        return os.getloadavg()  # TODO: test on a linux system the return of this method to split into an array


    def getServerInfo(self):
        return {CommonKeys.UPTIME : 12124, CommonKeys.LOAD_AVG : [0.12, 0.10, 0.05]}
        # return {"uptime": self.getUptime(), 'load_avg':self.getLoagAvg()}


    def getGPUGlobalId(self, relativeId):
        config = self.getConfig()
        if len(config) > relativeId:
            return int(config[relativeId]['global'])
        return -1


    def getConfig(self):
        try:
            json_data = open('config')
            return json.load(json_data)
        except IOError:
            print 'No valid config was found ! (or read error)'
            return []


    def writeConfig(self, config):
        print config
        with open('config', 'w') as outfile:
            json.dump(config, outfile)


    def getGpus(self):
        return self.getConfig()
