import json
import socket
import sys


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
            response = self.linesplit(self, s)
            response = response.replace('\x00', '')
            response = json.loads(response)
            succes = response['STATUS'][0]['STATUS']
            if succes == 'S':
                devArray = response['DEVS']
            s.close()
        except Exception, e:
            print "Could not reach cgminer. Providing false information !"
            return [{'Difficulty Accepted': 36736.0, 'Temperature': 62.0, 'Difficulty Rejected': 512.0, 'GPU Voltage': 1.206, 'GPU Clock': 1120, 'Fan Speed': 2424, 'Status': 'Alive', 'Device Rejected%': 1.3948, 'Fan Percent': 66, 'Rejected': 4, 'Memory Clock': 1500, 'Hardware Errors': 0, 'Accepted': 286, 'Last Share Pool': 0, 'Diff1 Work': 36708, 'Total MH': 2572.6812, 'Enabled': 'Y', 'Device Elapsed': 5510, 'Device Hardware%': 0.0, 'Last Valid Work': 1391302537, 'Last Share Time': 1391302537, 'GPU': 0, 'MHS av': 0.46999999999999997, 'Last Share Difficulty': 128.0, 'MHS 5s': 0.46999999999999997, 'GPU Activity': 99, 'Intensity': '18', 'Powertune': 20, 'Utility': 3.1099999999999999},
            {'Difficulty Accepted': 36736.0, 'Temperature': 62.0, 'Difficulty Rejected': 512.0, 'GPU Voltage': 1.206, 'GPU Clock': 1120, 'Fan Speed': 2424, 'Status': 'Alive', 'Device Rejected%': 1.3948, 'Fan Percent': 66, 'Rejected': 4, 'Memory Clock': 1500, 'Hardware Errors': 0, 'Accepted': 286, 'Last Share Pool': 0, 'Diff1 Work': 36708, 'Total MH': 2572.6812, 'Enabled': 'Y', 'Device Elapsed': 5510, 'Device Hardware%': 0.0, 'Last Valid Work': 1391302537, 'Last Share Time': 1391302537, 'GPU': 1, 'MHS av': 0.46999999999999997, 'Last Share Difficulty': 128.0, 'MHS 5s': 0.46999999999999997, 'GPU Activity': 99, 'Intensity': '18', 'Powertune': 20, 'Utility': 3.1099999999999999}]
        return devArray
