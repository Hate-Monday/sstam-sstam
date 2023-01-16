#!/bin/sh

SHELL_PATH=`pwd -P`
cd $SHELL_PATH/ios

rm -rf ~/Library/Developer/Xcode/DerivedData
rm -rf ./build
rm -rf ./Pods
rm -rf ./Delivery.xcworkspace
rm ./Podfile.lock

cd ../
npx pod-install ios

open -a Xcode ./ios/SSTAM_SSTAM.xcworkspace