# stripeCharge
 Nodejs AWS Lambda API for handles customer creation and Stripe card charges.
 
## Up and running
1. Create a new aws lambda function through the aws-console or aws-cli.
2. Set up aws env variables (use `test` key first) specified in the template.
3. Create a Stripe simple checkout form: https://stripe.com/docs/quickstart

## AWS Lambda ENV template
- `STRIPE_SECRET_TEST_KEY = 'your-stripe-secret-test-key'`
- `STRIPE_SECRET_LIVE_KEY = 'your-stripe-secret-live-key'`
- `SUCCESS_URL = 'https://test.com/success'`
- `CHARGE_AMOUNT = 999`
- `CURRENCY = 'US'`
- `DESCRIPTION = 'My service'`
 

 
