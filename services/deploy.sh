#! /bin/bash

npm i -g serverless
cd services
sls deploy --s $1
