'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";


export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    console.log('Admin client initialized:', account);

    const response = await account.createEmailPasswordSession(email, password);
    console.log('Sign-in successful, response:', response);

    // Store session in cookie
    (await cookies()).set('appwrite-session', response.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    return parseStringify(response);
  } catch (error: any) {
    console.error('Sign-in failed:', error.response?.message || error.message);
    throw error;
  }
};


export const signUp = async ( userData: SignUpParams) => {
    const { email, password, firstName, lastName} = userData;
    try{
      const { account } = await createAdminClient();
      const newUserAccount=await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
      const session = await account.createEmailPasswordSession(email, password);

  (await cookies()).set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return parseStringify(newUserAccount);
    } catch (error) {
        console.log('Error', error);
    }
}



export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
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