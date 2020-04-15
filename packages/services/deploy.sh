#! /bin/bash

cd packages/services
yarn sls config credentials --provider aws --key $AWS_ACCESS_KEY_ID --secret $AWS_SECRET_ACCESS_KEY

yarn sls remove -s $SERVICES_STAGE -r $AWS_REGION
yarn sls deploy -s $SERVICES_STAGE -r $AWS_REGION

mkdir -p prisma/backup
yarn run prisma:backup -p prisma/backup/db-backup.zip
echo Y | yarn sls client deploy -c prisma/serverless.yml -s $PRISMA_STAGE -r $AWS_REGION
