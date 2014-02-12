from threading import Thread
import SocketServer
from BaseHTTPServer import HTTPServer, BaseHTTPRequestHandler
import cgminerapi
import json

api = cgminerapi.api()

class Handler(BaseHTTPRequestHandler):


    def do_GET(self):
        res = api.getDevsArray()
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(res))


def serve_on_port(port):
    print "serving on local host port %s" % str(port)
    httpd = SocketServer.TCPServer(("localhost", port), Handler)
    httpd.serve_forever()
