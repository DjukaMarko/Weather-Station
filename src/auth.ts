import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcryptjs'
import { getUser } from './lib/utils';
import GoogleProvider from "@auth/core/providers/google"
import GitHubProvider from "@auth/core/providers/github"


export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_ID,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET_ID,
        }),
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
});