/**
 * Nodejs Stripe simple checkout
 * Handles creating new customer in Stripe from email and charging the customers card.
 */

const querystring = require('querystring');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY);

function handleCharge(event, context, callback) {
  console.log('stripeCharge started');
  if (!event.body) {
    return callback(null, buildErrorResponse('No token in request body', 400));
  }
  try {
    const requestBody = querystring.parse(event.body);  
  } catch(err) {
    return callback(null, buildErrorResponse('Bad Request', 400));
  }
  
  const tokenId = requestBody.stripeToken;
  const email = requestBody.stripeEmail;
  const amount = process.env.CHARGE_AMOUNT;
  const currency = process.env.CURRENCY;
  const description = process.env.DESCRIPTION;

  return createCustomerSource()
    .then(source => {
      return createCharge(amount, currency, description, source.customer);
    })
    .then(charge => {
      // Success response.
      console.log('Customer card charged, sending response', charge);
      return callback(null, {
        statusCode: 301,
        headers: {
          "Location": process.env.SUCCESS_URL
        },
        body: null
      });
    })
    .catch(err => {
      // Error response.
      console.error(err);
      return callback(null, buildErrorResponse(err.message, 500));
    });
}

/**
 * Builds a JSON error message response.
 *
 * @param {string} errorMessage
 * @param {number} statusCode
 * @return {string} 
 */
function buildErrorResponse(errorMessage, statusCode) {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      error: errorMessage
    })
  };
}

/**
 * Creates a new customer source from email.
 *
 * @param {string} email
 * @return {Promise}
 */
function createCustomerSource(email) {
  return stripe.customers.create({
      email: email
  })
  .then(customer => {
    return stripe.customers.createSource(customer.id, {
      source: tokenId
    });
  })
  .catch(err => {
    console.error(err.message);
    err.message = 'Failed to create customer';
    return Promise.reject(err);
  });
}

/**
 * Charges Stripe customer.
 *
 * @param {number} amount
 * @param {string} currency
 * @param {string} description
 * @param {Object} source
 * @return {Promise}
 */
function createCharge(amount, currency, description, customer) {
  return stripe.charges.create({
    amount,
    currency,
    description,
    customer
  });
}

exports.handler = handleCharge;
