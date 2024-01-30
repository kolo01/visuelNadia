import braintree from 'braintree'
const environment = process.env.BRAINTREE_ENVIRONMENT
const gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '87nhq24bndqjb5dk',
    publicKey:    'dqn8jn6ccmfdnj8c',
    privateKey:   '6f837b9b25676ba49460baece23847d6'
})
export default gateway;