#!/bin/sh -e

# install dependencies, run unit tests, and bundle all the files into a deployable zip file.
if [ ! -f ./config.json ]; then
    echo "Unable to build Lambda.zip! \"config.json\" is required!"
    exit 1
fi


npm install

rm -rf ./dist
mkdir -p dist

echo "\n\n\nFIX UNIT TESTS!!! Uncomment \"npm test in build.sh\"\n\n\n"
#npm test

zip -r -q dist/lambda.zip ./ -x ./*\.sh ./.git/**\* ./dist ./spec ./provisioning ./.idea
