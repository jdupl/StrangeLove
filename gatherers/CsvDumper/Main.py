# author Justin Duplessis 2014
# Simple script to store local sgminer/cgminer data into csv.
# This script will run with cron each 5minutes until the real daemon is completed.
__version__ = "v0.1.1"

import os.path
import socket
import json
import sys
import csv
import datetime
from Keys import *


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


def getDevsArray():
    devArray = []
    api_command = "devs"
    if len(sys.argv) < 2:
        api_ip = '127.0.0.1'
        api_port = 4028
    else:
        api_ip = sys.argv[1]
        api_port = sys.argv[2]
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((api_ip, int(api_port)))
    s.send(json.dumps({"command": api_command}))

    response = linesplit(s)
    response = response.replace('\x00', '')
    response = json.loads(response)
    succes = response['STATUS'][0]['STATUS']
    if succes == 'S':
        devArray = response['DEVS']
    s.close()
    return devArray


def dump(device):
    devId = str(device['GPU'])
    temperature = device[Keys.TEMPERATURE]
    gpuVoltage = device[Keys.GPU_VOLTAGE]
    gpuClock = device[Keys.GPU_CLOCK]
    memClock = device[Keys.MEM_CLOCK]
    fanRPM = device[Keys.FAN_RPM]
    fanPercent = device[Keys.FAN_PERCENT]
    hwErrors = device[Keys.HW_ERRORS]
    rejectedRatio = device[Keys.REJECTED_RATIO]
    currentHashRate = float(device[Keys.CURRENT_HASH_RATE]) * 1000  # rate is given in gh/s with sgminer
    totalMH = float(device[Keys.TOTAL_MH]) * 1000  # rate is given in gh/s with sgminer
    intensity = device[Keys.INTENSITY]
    utility = device[Keys.UTILITY]
    elapsed = device[Keys.ELAPSED]
    accepted = device[Keys.ACCEPTED]
    rejected = device[Keys.REJECTED]
    realMhAverage = float(totalMH) / float(elapsed)
    time = datetime.datetime.now()

    filePath = "data-%s.csv" % devId
    # if file does not exist, first create title row
    if not os.path.isfile(filePath):
        csvWriter = csv.writer(open(filePath, 'wb'), delimiter=';', quotechar='|', quoting=csv.QUOTE_MINIMAL)
        csvWriter.writerow(["time", "currentHashRate", "realMhAverage", "rejectedRatio", "temperature", "fanRPM",
            "fanPercent", "intensity", "utility", "hwErrors", "gpuVoltage", "gpuClock", "memClock", "accepted", "rejected"])
    # append line
    csvWriter = csv.writer(open(filePath, 'a'), delimiter=';', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    csvWriter.writerow([time, currentHashRate, realMhAverage, rejectedRatio, temperature, fanRPM, fanPercent,
         intensity, utility, hwErrors, gpuVoltage, gpuClock, memClock, accepted, rejected])


def main():
    print "SgMiner/Cgminer api csv dumper version %s" % __version__
    print "Getting data from api..."
    devices = getDevsArray()
    print "got %s device(s)" % str(len(devices))
    for device in devices:
        dump(device)

if __name__ == "__main__":
    main()
