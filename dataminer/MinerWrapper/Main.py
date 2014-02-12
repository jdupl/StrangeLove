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


__version__ = "v0.0.0"

import Server
from threading import Thread

def main():
    print "SgMiner/Cgminer api wrapper version %s" % __version__
    Thread(target=Server.serve_on_port, args=[1337]).start()
    print "server started"
    

if __name__ == "__main__":
    main()