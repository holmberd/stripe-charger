# Stripe Charger
 Nodejs AWS Lambda API that handles customer creation and Stripe simple checkout card charges.
 
## Up and running
1. Set up aws env variables (use `test` key first) specified in the template.
2. Create a Stripe simple checkout form: https://stripe.com/docs/quickstart
3. Set up AWS API Gateway. Need to accept POST, and enable CORS for the website that will use it.

## AWS Lambda ENV template
- `STRIPE_SECRET_TEST_KEY = 'your-stripe-secret-test-key'`
- `STRIPE_SECRET_LIVE_KEY = 'your-stripe-secret-live-key'`
- `SUCCESS_URL = 'https://test.com/success'`
- `CHARGE_AMOUNT = 999`
- `CURRENCY = 'US'`
- `DESCRIPTION = 'My service'`
 

 
