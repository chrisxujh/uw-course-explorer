#!/usr/bin/env bash

echo "Building app..."
yarn build --base-href http://chrisxu.me/uw-course-explorer/

cd ./dist/uw-course-explorer
cp ./index.html ./404.html