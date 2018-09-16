ZIP_PATH=`pwd`/stripe-charger.zip

aws --profile=my-profile lambda update-function-code \
    --function-name stripe-charger \
    --zip-file fileb://$ZIP_PATH
