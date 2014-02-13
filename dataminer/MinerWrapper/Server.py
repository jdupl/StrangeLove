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
        server_id = "id"
        server_status = ServerInfo.getServerInfo()
        devs = api.getDevsArray()
        # check if config has the same number of gpu as cginer reports
        if len(devs) != len(ServerInfo.getGpus()):
            print "Config is not sane!"
            self.send_response(500)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write("Config is not sane!")
        else:
            gpu_statuses = GpuInfo.processDevs(devs)
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
