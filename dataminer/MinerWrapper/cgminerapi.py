import json
import socket


class api():


    def linesplit(self, socket):
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


    def getDevsArray(self, api_data):
        if 'DEVS' in api_data:
            return api_data['DEVS']
        else:
            return []

    def getServerTime(self, api_data):
        when = 0
        if 'STATUS' in api_data:
            when = api_data['STATUS'][0]['When']
        return when

    def isValidReponse(self, api_data):
        if 'STATUS' in api_data and api_data['STATUS'][0]['STATUS'] == 'S' and api_data['STATUS'][0]['Code'] == 9:
            return True
        return False


    def call(self):
        api_ip = '127.0.0.1'
        api_port = 4028
        api_command = "devs"
        response = []

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            s.connect((api_ip, int(api_port)))
            s.send(json.dumps({"command": api_command}))
            response = self.linesplit(s)
            response = response.replace('\x00', '')
            response = json.loads(response)
            s.close()
        except Exception, e:
            print "Could not reach cgminer."
            return [];
        return response
