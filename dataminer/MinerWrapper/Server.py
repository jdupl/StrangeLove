
# Api to serve local sgminer/cgminer data and send it via http formatted as
# json.
# This api will figure out which relative gpu id is which global gpu id to
# simplify the analysis program.

# Copyright (C) 2014 Justin Duplessis

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.

# You should have received a copy of the GNU General Public License
# along with this program. If not, see <http://www.gnu.org/licenses/>.



__version__ = "v1.2.0"

from BaseHTTPServer import BaseHTTPRequestHandler
import BaseHTTPServer
import SocketServer
import json
import time
import os

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
    print "Serving port %s" % str(port)

    # test config
    # ServerInfo.writeConfig([{'relative':'0', 'global':'1234'})
    ServerInfo.writeConfig([{'relative':'0', 'global': 1234}, {'relative':'1', 'global' : 1235}])
    server_class = BaseHTTPServer.HTTPServer
    httpd = server_class(("", port), Handler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
		pass
    httpd.server_close()
    print "Server stopped"


if __name__ == "__main__":
    print "SgMiner/Cgminer api wrapper version %s" % __version__
    if os.name == "nt":
        print "OS is not supported ! Server information will not be correct."
    serve_on_port(1337)
