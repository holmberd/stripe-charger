ZIP_PATH=`pwd`/stripe-charger.zip
REGION=''
IAM_ARN='arn:aws:iam:: ...'
LAMBDA_ARN='arn:aws:lambda: ...'

aws --profile=my-profile lambda create-function \
    --region $REGION \
    --function-name stripe-charger \
    --zip-file fileb://$ZIP_PATH \
    --role $IAM_ARN \
    --handler stripe-charger.handleCharge \
    --runtime nodejs6.10 \
    --timeout 10 \
    --memory-size 512
