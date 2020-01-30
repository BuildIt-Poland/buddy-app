#! /bin/bash

cd services
npm run sls config credentials --provider aws --key $AWS_ACCESS_KEY --secret $AWS_SECRET_ACCESS_KEY
npm run deploy --s $1
