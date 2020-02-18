#! /bin/bash

yarn cy:ci
yarn coverage
yarn lint
yarn build
yarn lighthouse
