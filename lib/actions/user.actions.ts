'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { cookies } from "next/headers";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";

import { plaidClient} from "@/lib/plaid";
import { parse } from "path";
import { access, link } from "fs";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { set } from "react-hook-form";
import { format, isValid } from 'date-fns';

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,

} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    )
    
    return parseStringify(user.documents[0]); 
  } catch (error) {
    console.error("An error occurred while getting the banks:", error);
  }
}


export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    console.log("Appwrite client initialized");

    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created:", session);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    console.log("Cookie set");

    const user = await getUserInfo({ userId: session.userId });
    console.log("User info fetched:", user);

    return parseStringify(user);
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error; // Re-throw the error for the calling function to handle.
  }
};



export const signUp = async ( {password,...userData}: SignUpParams) => {
    const { email, firstName, lastName} = userData;

    const formattedDateOfBirth = format(new Date(userData.dateOfBirth), 'yyyy-MM-dd');
    if (!isValid(new Date(formattedDateOfBirth))) {
      throw new Error('Invalid date of birth');
    }

    const validatePostalCode = (postalCode: string) => {
      return /^\d{5}$/.test(postalCode);
    };
    if (!validatePostalCode(userData.postalCode)) {
      throw new Error('Invalid postal code');
    }

    // Validate postalCode
    if (!validatePostalCode(userData.postalCode)) {
      throw new Error('Invalid postal code');
    }

    let newUserAccount;
    
    try{
      const { account,database } = await createAdminClient();
      newUserAccount=await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);

      if(!newUserAccount) throw new Error('User account not created');


      const dwollaCustomerUrl = await createDwollaCustomer({ 
        ...userData,
        type: 'personal'
       })

       if(!dwollaCustomerUrl) throw new Error('Dwolla customer not created');
       const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl)

       const newUser = await database.createDocument(
         DATABASE_ID!,
         USER_COLLECTION_ID!,
         ID.unique(),
         {
          ...userData,
          userId: newUserAccount.$id,
          dwollaCustomerId,
          dwollaCustomerUrl
         }
        )

       const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

  return parseStringify(newUser);
    } catch (error) {
        console.log('Error', error);
    }
}



export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}


export const logoutAccount = async () =>{
  try{
    const { account} = await createSessionClient();

    (await cookies()).delete('appwrite-session');


    await account.deleteSession('current');
    return true;
  } catch (error) {
    return null;
  }
}


export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      user:{
        client_user_id: `${user.firstName} ${user.lastName}`,
      },
      client_name : user.firstName+" "+user.lastName,
      products: ['auth', 'transactions'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }
    //console.log(tokenParams)
    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ linkToken: response.data.link_token })

  } catch (error:any) {
    console.error('Create link token error:', error);
    // console.log(error.request)
    // console.log(error.config)
    // console.log(error.response)
    throw error;
  }
}


export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,
}: createBankAccountProps) => {
  try {
    console.log("Creating bank account with data:", {
      userId,
      bankId,
      accountId,
      accessToken,
      fundingSourceUrl,
      sharableId,
    });

    const { database } = await createAdminClient();
    console.log("Connected to Appwrite.");

    const documentId = ID.unique(); // Generate a unique ID for the document
    console.log("Generated document ID:", documentId);

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      documentId, // Use the generated document ID
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      }
    );
    console.log("Bank account created in Appwrite:", bankAccount);

    return parseStringify(bankAccount);
  } catch (error) {
    console.error("An error occurred while creating the bank account:", error);
    throw error;
  }
};

export const exchangePublicToken = async ({ publicToken, user }: exchangePublicTokenProps) => {
  try {
    console.log("Exchanging public token...");
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    console.log("Public token exchanged. Access Token:", accessToken, "Item ID:", itemId);

    const accountResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = accountResponse.data.accounts[0];
    console.log("Account data retrieved:", accountData);

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    console.log("Creating processor token...");
    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;
    console.log("Processor token created:", processorToken);

    console.log("Adding funding source...");
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    console.log("Funding source URL:", fundingSourceUrl);

    if (!fundingSourceUrl) throw new Error("Failed to create funding source.");

    console.log("Creating bank account in Appwrite...");
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });

    console.log("Bank account created successfully.");
    revalidatePath("/");

    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while exchanging the public token:", error);
    throw error; // Re-throw the error to propagate it
  }
};

export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const { database } = await createAdminClient();
    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );

    // Transform Document objects into Bank objects
    // const banks: Bank[] = response.documents.map((doc) => ({
    //   $id: doc.$id,
    //   accountId: doc.accountId,
    //   bankId: doc.bankId,
    //   accessToken: doc.accessToken,
    //   fundingSourceUrl: doc.fundingSourceUrl,
    //   userId: doc.userId,
    //   sharableId: doc.sharableId,
    // }));

    return parseStringify(banks.documents);
  } catch (error) {
    console.error('An error occurred while getting the banks:', error);
    throw error;
  }
};

export const getBank = async ({documentId }: getBankProps) => {
  try {
    const { database } = await createAdminClient();
    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("$id", [documentId])]
    )
    
    return parseStringify(bank.documents[0]); 
  } catch (error) {
    console.error("An error occurred while getting the banks:", error);
  }
}


export const getBankByAccountId = async ({accountId }: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();
    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("accountId", [accountId])]
    )
    
    if(bank.total !== 1) return null;

    return parseStringify(bank.documents[0]); 
  } catch (error) {
    console.error("An error occurred while getting the banks:", error);
  }
}




