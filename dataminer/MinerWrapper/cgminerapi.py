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
            response = self.linesplit(self, s)
            response = response.replace('\x00', '')
            response = json.loads(response)
            s.close()
        except Exception, e:
            print "Could not reach cgminer. Providing false information !"
            return {'STATUS': [{'STATUS': 'S', 'Msg': '2 GPU(s)', 'Code': 9, 'When': 1391297368, 'Description': 'sgminer 4.0.0'}],
            'DEVS': [{'Difficulty Accepted': 36736.0, 'Temperature': 62.0, 'Difficulty Rejected': 512.0, 'GPU Voltage': 1.206, 'GPU Clock': 1120, 'Fan Speed': 2424, 'Status': 'Alive', 'Device Rejected%': 1.3948, 'Fan Percent': 66, 'Rejected': 4, 'Memory Clock': 1500, 'Hardware Errors': 0, 'Accepted': 286, 'Last Share Pool': 0, 'Diff1 Work': 36708, 'Total MH': 2572.6812, 'Enabled': 'Y', 'Device Elapsed': 5510, 'Device Hardware%': 0.0, 'Last Valid Work': 1391302537, 'Last Share Time': 1391302537, 'GPU': 0, 'MHS av': 0.46999999999999997, 'Last Share Difficulty': 128.0, 'MHS 5s': 0.46999999999999997, 'GPU Activity': 99, 'Intensity': '18', 'Powertune': 20, 'Utility': 3.1099999999999999},
            {'Difficulty Accepted': 36736.0, 'Temperature': 62.0, 'Difficulty Rejected': 512.0, 'GPU Voltage': 1.206, 'GPU Clock': 1120, 'Fan Speed': 2424, 'Status': 'Alive', 'Device Rejected%': 1.3948, 'Fan Percent': 66, 'Rejected': 4, 'Memory Clock': 1500, 'Hardware Errors': 0, 'Accepted': 286, 'Last Share Pool': 0, 'Diff1 Work': 36708, 'Total MH': 2572.6812, 'Enabled': 'Y', 'Device Elapsed': 5510, 'Device Hardware%': 0.0, 'Last Valid Work': 1391302537, 'Last Share Time': 1391302537, 'GPU': 1, 'MHS av': 0.46999999999999997, 'Last Share Difficulty': 128.0, 'MHS 5s': 0.46999999999999997, 'GPU Activity': 99, 'Intensity': '18', 'Powertune': 20, 'Utility': 3.1099999999999999}],
            'id': 1}
        return response
