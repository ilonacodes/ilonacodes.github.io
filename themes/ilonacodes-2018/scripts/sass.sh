#!/usr/bin/env bash

npx node-sass \
  --output ./static/css \
  --source-map true \
  --source-map-contents \
  --include-path $PWD/node_modules \
  $* \
  ./static/scss
