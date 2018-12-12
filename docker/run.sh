#!/bin/bash
set -ue

[[ -d "$PWD/vespaapp" ]] || { echo "Run this from the repo's root"; exit; }

docker run --name mongodb -d mongo:4.0 || echo "Container 'mongodb' already running!"
docker run --name meteor -it -p 3000:3000 -v $PWD/vespaapp:/app meteor:latest
