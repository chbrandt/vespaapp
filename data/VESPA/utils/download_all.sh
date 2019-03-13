#!/bin/bash

# ====================================
# Download all data from all services
# ====================================

#for s in `./download_data.py list --minimal`; do
#    ./download_data.py fetch $s
#done
./download_data.py list --minimal | xargs -I{} -P4 bash -c "./download_data.py fetch --limit 1000 {} &> ./data/{}.log" 

