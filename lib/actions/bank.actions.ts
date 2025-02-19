"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid";
import { parseStringify } from "../utils";
import { getTransactionsByBankId } from "./transaction.actions";

// import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: { userId: string }) => {
  try {
    // Fetch banks from the database
    const banks = await getBanks({ userId });

    // Fetch account details for each bank
    const accounts = await Promise.all(
      banks.map(async (bank) => {
        // Get account info from Plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });

        const accountData = accountsResponse.data.accounts[0];

        // Get institution info from Plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        // Construct the account object
        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available ?? 0, // Default to 0 if null
          currentBalance: accountData.balances.current ?? 0, // Default to 0 if null
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name ?? '', // Default to empty string if null
          mask: accountData.mask ?? '', // Default to empty string if null
          type: accountData.type,
          subtype: accountData.subtype ?? '', // Default to empty string if null
          appwriteItemId: bank.$id,
          sharableId: bank.sharableId,
        };

        return account;
      })
    );

    // Calculate total banks and total current balance
    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    // Return the result
    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error('An error occurred while getting the accounts:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    // get bank from db
    const bank = await getBank({ documentId: appwriteItemId });

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank?.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // //get transfer transactions from appwrite
    // const transferTransactionsData = await getTransactionsByBankId({
    //   bankId: bank.$id,
    // });
     
    // const transferTransactions = transferTransactionsData.documents.map(
    //   (transferData: Transaction) => ({
    //     id: transferData.$id,
    //     name: transferData.name ?? "Unknown",
    //     amount: transferData.amount ?? 0,
    //     date: transferData.$createdAt,
    //     paymentChannel: transferData.channel ?? "Unknown",
    //     category: transferData.category ?? "Uncategorized",
    //     type: transferData.senderBankId === bank?.$id ? "debit" : "credit",
    //   })
    // );

    // get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });
    console.log("Here They are")
    const transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });
    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank?.$id,
      transactions
    };

    // sort transactions by date such that the most recent transaction is first
    //   const allTransactions = [...transactions].sort(
    //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    // );
    
    console.log(account)
    return account;
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

// Get bank info
export const getInstitution = async ({ institutionId }: { institutionId: string }) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ['US'] as CountryCode[],
    });

    if (!institutionResponse.data.institution) {
      throw new Error('Institution not found');
    }

    return parseStringify(institutionResponse.data.institution);
  } catch (error) {
    console.error('An error occurred while getting the institution:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};