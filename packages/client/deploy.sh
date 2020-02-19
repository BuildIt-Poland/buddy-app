#! /bin/bash

cd packages/client
yarn cy:ci
yarn coverage
yarn lint
yarn build
yarn lighthouse
