#!/bin/bash

# Currently running MongoDB through Docker:
# > docker run -d --name db -v $PWD:/vespaapp -p 27017:27017 mongo:4.0
#
export MONGO_URL='mongodb://localhost:27017/meteor'
