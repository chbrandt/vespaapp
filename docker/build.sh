#!/bin/bash

docker build --build-arg UID=$UID -t meteor -f Dockerfile.meteor .
