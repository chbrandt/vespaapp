#!/bin/bash
set -ue

[[ -d "$PWD/vespaapp" ]] || { echo "Run this from the repo's root"; exit; }

docker run --name db -d -v $PWD:/mnt/host mongo:4.0 || echo "Container 'mongodb' already running!"
docker run --name meteor -it --link db -v $PWD:/vespaapp -p 3000:3000 meteor:latest
