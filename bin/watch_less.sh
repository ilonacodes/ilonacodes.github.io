#!/usr/bin/env bash

LESS_FILE=themes/hugo-geo-modified/static/less/style.less
WATCH_FILES=themes/hugo-geo-modified/static/less/*.less
CSS_FILE=themes/hugo-geo-modified/static/css/style.css

ls ${WATCH_FILES} | entr \
  lessc "${LESS_FILE}" "${CSS_FILE}"
