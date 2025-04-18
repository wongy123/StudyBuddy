#!/bin/bash

APP_NAME="StudyBuddy"
DEPLOY_PATH="/var/www/html/$APP_NAME"
BUILD_PATH="dist"

npm run build
sudo rm -rf "$DEPLOY_PATH"/*
sudo cp -r "$BUILD_PATH"/* "$DEPLOY_PATH"/