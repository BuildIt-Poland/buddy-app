#! /bin/bash

cd packages/services
yarn sls config credentials --provider aws --key $AWS_ACCESS_KEY --secret $AWS_SECRET_ACCESS_KEY
yarn sls deploy -s $1
