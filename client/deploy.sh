#!/bin/bash
set -x #echo on

APP_NAME="StudyBuddy"
DEPLOY_PATH="/var/www/html/$APP_NAME"
BUILD_PATH="dist"

sudo mkdir -p "$DEPLOY_PATH"

npm run build
sudo rm -rf "$DEPLOY_PATH"/*
sudo cp -r "$BUILD_PATH"/* "$DEPLOY_PATH"/

sudo chown caddy:caddy -R "$DEPLOY_PATH"
sudo chown -R 755 "$DEPLOY_PATH"
