import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.Plaid_CLIENT_ID,
            'PLAID-SECRET': process.env.Plaid_SECRET,
            'Plaid-Version': '2020-09-14',
        }
    } 
})

export const plaidClient = new PlaidApi(configuration);