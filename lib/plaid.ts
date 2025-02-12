import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.Plaid_CLIENT_ID,
            'PLAID-SECRET': process.env.Plaid_SECRET,
        }
    } 
})

export const plaidClient = new PlaidApi(configuration);