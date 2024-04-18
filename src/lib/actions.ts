'use server'

import { signIn, signOut } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation';
import { UserConflictError } from './errors/UserConflictError';
import { getUser } from './utils';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

export async function authenticate(
  prevState: { message: string, id: string } | undefined,
  formData: FormData,
) {
  try {
    console.log(formData);
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: "Invalid credentals.", id: uuidv4() };
        default:
          return { message: "Something went wrong ...", id: uuidv4() };
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

function isError(obj: any): obj is Error {
  return obj instanceof Error;
}

export async function register(
  prevState: { message: string, id: string } | undefined,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm_password = formData.get("confirm-password") as string;
    const user = await getUser(email);

    const formDataSchema = z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(6)
        .refine((password) => {
          return password === confirm_password;
        }, { message: "Passwords do not match" }),
      confirm_password: z.string().min(6),
    });


    formDataSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm-password") as string,
    });

    if (user) throw new UserConflictError();

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        await sql`INSERT INTO users (Email, Password) VALUES (${email}, ${hash});`;
      });
    });

  } catch (error) {
    if (isError(error)) {
      let errorMessage: string;
      try {
        const parsedError = JSON.parse(error.message);
        if (Array.isArray(parsedError) && parsedError.length > 0) {
          errorMessage = parsedError[0].message;
        } else {
          errorMessage = error.message;
        }
      } catch (parseError) {
        errorMessage = error.message;
      }

      return { message: errorMessage, id: uuidv4() };
    }
  }
  redirect("/login");
}


export async function querySearchAutoCompletion(query: string) {
  try {
    console.log(query);
    const sqlQuery = await sql`SELECT name, cou_name_en, lon, lat FROM cities WHERE name ILIKE ${query + '%'} LIMIT 10;`;
    return sqlQuery.rows;
  } catch (error) {
    throw error;
  }
}