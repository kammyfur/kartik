#!/bin/bash
npx electron-packager . KartikX --ignore="(.gitignore|data|kartik.bat|kartik.desktop|kartik.sh|kartik-mac.sh|kartik-nosandbox.bat|kartik-setup.sh|package-lock.json|LICENSE|README.md|SatteliteGiteaData.txt)" --out build/debug --overwrite
