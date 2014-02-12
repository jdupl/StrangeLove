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
        server_status = {"uptime": 12124, 'load_avg':[0.12, 0.10, 0.05]}
        devs = api.getDevsArray()
        gpu_statuses = GpuInfo.processDevs(devs)
        res = {'timestamp':timestamp, 'server_id': server_id, 'server_status':server_status, 'gpu_statuses':gpu_statuses}
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(res))

def serve_on_port(port):
    print "Serving on local host port %s" % str(port)
    httpd = SocketServer.TCPServer(("localhost", port), Handler)
    httpd.serve_forever()
