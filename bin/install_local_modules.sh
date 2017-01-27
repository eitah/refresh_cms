#!/usr/bin/env bash

# Execution of this file is assumed to execute within the refresh_cms root directory

set -e
set +x

INSTALL() {
#    npm config rm https-proxy
#    npm config rm proxy
#    INSTALL_FROM_ARTIFACTORY $1

    npm config set proxy http://webproxy.igslb.allstate.com:8080
    npm config set https-proxy http://webproxy.igslb.allstate.com:8080
    npm config set registry http://registry.npmjs.org
    npm install
#    npm run build
}

#INSTALL_FROM_ARTIFACTORY() {
#
#    npm config set registry https://artifactory.allstate.com/artifactory/api/npm/npm
#    npm install allstate-rp-core
#    npm install allstate-rp-core-decorators
#    npm install allstate-rp-core-libraries
#    npm install allstate-rp-test-utils
#
#}

INSTALL "allstate-rp-app-intelligence"

npm config rm https-proxy
npm config rm proxy
npm config set registry https://artifactory.allstate.com/artifactory/api/npm/npm