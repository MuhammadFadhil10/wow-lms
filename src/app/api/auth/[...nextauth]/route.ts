import { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: `${process.env.Google_CLIENT_ID}`,
      clientSecret: `${process.env.Google_CLIENT_SECRET}`,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.id_token;
      }

      return token;
    },

    async session({ session, token }) {
      const customSession: Session & { access_token?: string } = {
        ...session,
      };

      customSession.access_token = token.access_token as string;

      return customSession;
    },
    async redirect({ url }) {
      url = "/";

      return url;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
