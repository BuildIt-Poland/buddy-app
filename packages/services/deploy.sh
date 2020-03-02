#! /bin/bash

cd packages/services

[ $SERVICES_ENV = prod ] && export PRISMA_ENDPOINT=https://eu1.prisma.sh/anton-lunov/Buddy-app/prod || export PRISMA_ENDPOINT=https://eu1.prisma.sh/anton-lunov/Buddy-app/test

yarn sls config credentials --provider aws --key $AWS_ACCESS_KEY --secret $AWS_SECRET_ACCESS_KEY
yarn sls deploy -s $SERVICES_ENV
