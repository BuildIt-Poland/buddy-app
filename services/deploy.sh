#! /bin/bash

npm install -g serverless
npm run build
npm run deploy -- --stage $1
