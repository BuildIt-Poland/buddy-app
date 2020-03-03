#! /bin/bash

cd packages/client

export REACT_APP_SERVER_URL=https://$API_GATEWAY_DOMAIN/$APP_STAGE
export REACT_APP_BUCKET=$APP_BUCKET-$APP_STAGE
[ $APP_STAGE = prod ] && export REACT_APP_DOMAIN=$APP_DOMAIN || export REACT_APP_DOMAIN=$APP_STAGE-$APP_DOMAIN

yarn sls config credentials --provider aws --key $AWS_ACCESS_KEY --secret $AWS_SECRET_ACCESS_KEY
yarn deploy