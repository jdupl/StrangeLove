import SocketServer
from BaseHTTPServer import BaseHTTPRequestHandler
import cgminerapi
import ServerInfo
import GpuInfo
import json
import time

api = cgminerapi.api()
ServerInfo = ServerInfo.ServerInfo()
GpuInfo = GpuInfo.GpuInfo()

class Handler(BaseHTTPRequestHandler):


    def do_GET(self):
        timestamp = int(round(time.time() * 1000))
        server_id = "id" # TODO: get server id
        # get server status
        server_status = ServerInfo.getServerInfo()
        # cgminer call
        api_data = api.call()
        devs = api.getDevsArray(api_data)
        
        # is the api response valid ?
        if not api.isValidReponse(api_data):
            print "Could not get valid api result!"
            self.send_response(500)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write("Could not get valid api result!")
        # check if config has the same number of gpu as cginer reports
        elif len(devs) != len(ServerInfo.getGpus()):
            print "Config is not sane !"
            self.send_response(500)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write("Config is not sane !")
        else:
            when = api.getServerTime(api_data)
            gpu_statuses = GpuInfo.processDevs(devs, when)
            res = {'timestamp':timestamp, 'server_id': server_id, 'server_status':server_status, 'gpu_statuses':gpu_statuses}
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(res))

def serve_on_port(port):
    print "Serving on local host port %s" % str(port)

    # test config
    ServerInfo.writeConfig([{'relative':'0', 'global':'1234'}, {'relative':'1', 'global':'1235'}])

    httpd = SocketServer.TCPServer(("localhost", port), Handler)
    httpd.serve_forever()
