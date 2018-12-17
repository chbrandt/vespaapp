#!/bin/bash

[[ -d "$PWD/vespaapp" ]] || { echo "Run this from the repo's root"; exit; }

docker run --name mdb -d \
           -v $PWD/data:/work/data \
           mongo:4.0 \
       || echo "Container 'mongodb' already running!"

docker run --name vapp -it \
           --link mdb \
           -e MONGO_URL='mongodb://mdb:27017/meteor' \
           -e LC_ALL="C.UTF-8" \
           -v $PWD/vespaapp:/work/app \
           -w /work/app \
           -p 3000:3000 \
           meteor:latest
