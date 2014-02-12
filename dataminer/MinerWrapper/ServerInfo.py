import os
import json

class ServerInfo():

    # def getUptime(self):
        # return uptime()
    
    # def getLoadAvg(self):
        # return os.getloadavg()

    def getServerInfo(self):
        return []
    
    def getGPUGlobalId(self, relativeId):
        # json_data=open('config')
        json_data = json.dumps(
        [{'relative':'0', 'global':'1234'},
        {'relative':'1', 'global':'1235'}])
        data = json.loads(json_data)
        if len(data) > relativeId:
            return data[relativeId]['global']
        return -1
