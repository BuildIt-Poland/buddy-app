#! /bin/bash

npm i -g serverless
cd packages/services
sls config credentials --provider aws --key $AWS_ACCESS_KEY --secret $AWS_SECRET_ACCESS_KEY
sls deploy --s $1
