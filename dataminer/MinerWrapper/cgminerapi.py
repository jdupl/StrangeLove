import os.path
import socket
import json
import sys
import datetime
from Keys import *

class api():


    def linesplit(socket):
        b = socket.recv(4096)
        done = False
        while not done:
            more = socket.recv(4096)
            if not more:
                done = True
            else:
                b = b + more
        if b:
            return b


    def getDevsArray(self):
        devArray = []
        api_command = "devs"
        if len(sys.argv) < 2:
            api_ip = '127.0.0.1'
            api_port = 4028
        else:
            api_ip = sys.argv[1]
            api_port = sys.argv[2]
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            s.connect((api_ip, int(api_port)))
            s.send(json.dumps({"command": api_command}))

            response = linesplit(s)
            response = response.replace('\x00', '')
            response = json.loads(response)
            succes = response['STATUS'][0]['STATUS']
            if succes == 'S':
                devArray = response['DEVS']
            s.close()
        except Exception, e:
            print "Could not reach cgminer"
        return devArray
