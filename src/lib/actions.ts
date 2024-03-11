'use server'

import { signIn, signOut } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation';
import { UserConflictError } from './errors/UserConflictError';
import { PasswordMismatchError } from './errors/PasswordMismatchError';
import { FormEmptyError } from './errors/FormEmptyError';
import { getUser } from './utils';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(formData);
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function misauthenticate() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}

export async function googleauthenticate() {
  try {
    await signIn("google");
  } catch (error) {
    throw error;
  }
}

export async function githubauthenticate() {
  try {
    await signIn("github");
  } catch (error) {
    throw error;
  }
}


export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm_password = formData.get("confirm-password") as string;
    const user = await getUser(email);

    if (email.length === 0 || password.length === 0 || confirm_password.length === 0) throw new FormEmptyError();
    if (password !== confirm_password) throw new PasswordMismatchError();
    if (user) throw new UserConflictError();

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        await sql`INSERT INTO users (Email, Password) VALUES (${email}, ${hash});`;
      });
    });

  } catch (error) {
    const errorClasses = [PasswordMismatchError, UserConflictError, FormEmptyError];

    const isErrorInstanceOfAny = errorClasses.some(errorClass => error instanceof errorClass);
    if(isErrorInstanceOfAny) return (error as Error).message as string;
    throw error;
  }
  redirect("/login");
}