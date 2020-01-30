#! /bin/bash

npm install -g serverless
npm run build
npm run create-domain -- --stage $1
npm run deploy -- --stage $1
