from BaseHTTPServer import BaseHTTPRequestHandler
import SocketServer
import json
import time

from CommonKeys import *
from ErrorCodes import *
import GpuInfo
import ServerInfo
import cgminerapi


api = cgminerapi.api()
ServerInfo = ServerInfo.ServerInfo()
GpuInfo = GpuInfo.GpuInfo()

class Handler(BaseHTTPRequestHandler):


    def do_GET(self):
        timestamp = int(round(time.time()))
        server_id = 1  # TODO: get server id
        # get server status
        server_status = ServerInfo.getServerInfo()
        # cgminer call
        api_data = api.call()
        devs = api.getDevsArray(api_data)
        http_code = 200

        # is the api response valid ?
        if not api.isValidReponse(api_data):
            print "Could not get valid api result!"
            res = {CommonKeys.REQUEST_STATUS : ErrorCodes.BAD_CGMINER}
            http_code = 500
        # check if config has the same number of gpu as cginer reports
        elif len(devs) != len(ServerInfo.getGpus()):
            print "Config is not sane !"
            res = {CommonKeys.REQUEST_STATUS : ErrorCodes.CONFIG_ERROR}
            http_code = 500
        else:
            when = api.getServerTime(api_data)
            gpu_statuses = GpuInfo.processDevs(devs, when)
            res = {
                CommonKeys.REQUEST_STATUS : ErrorCodes.OK,
                CommonKeys.TIMESTAMP : timestamp,
                CommonKeys.SERVER_ID : server_id,
                CommonKeys.SERVER_STATUS : server_status,
                CommonKeys.GPUS_STATUS : gpu_statuses
            }
        # send response
        self.send_response(http_code)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(res))

def serve_on_port(port):
    print "Serving on local host port %s" % str(port)

    # test config
    # ServerInfo.writeConfig([{'relative':'0', 'global':'1234'})
    ServerInfo.writeConfig([{'relative':'0', 'global': 1234}, {'relative':'1', 'global' : 1235}])

    httpd = SocketServer.TCPServer(("localhost", port), Handler)
    httpd.serve_forever()
