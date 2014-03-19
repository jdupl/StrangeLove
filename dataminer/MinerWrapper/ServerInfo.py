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
        loadavgF = open("/proc/loadavg","r")
        loadavg = loadavgF.read()
        loadavgF .close()
        loadavg = loadavg.split()
        return [float(loadavg[0]), float(loadavg[1]), float(loadavg[2])]


    def getServerInfo(self):
        return {CommonKeys.UPTIME : self.getUptime(), CommonKeys.LOAD_AVG : self.getLoadAvg()}
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
