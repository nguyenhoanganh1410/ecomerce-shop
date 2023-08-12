import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID as string,
      clientSecret: process.env.AUTH0_SECRET as string,
      issuer: process.env.AUTH0_ISSUER,
      authorization: {
        params: {
          prompt: "login",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user}) {
      if (token?.sub && (token as any)?.accessToken) {
        session.user.id = token.sub;
        session.accessToken = (token as any)?.accessToken
      }
      return session;
    },
  },
};
