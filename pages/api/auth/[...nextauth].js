import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import {spotifyApi, LOGIN_URL} from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.access_token);
    spotifyApi.setRefreshToken(token.refresh_token);

    const { body: refreshToken } = await spotifyApi.refreshAccessToken();
    console.log('refresh token', refreshToken);

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: Date.now()  + refreshToken.expires_in * 1000,
      refreshToken: refreshToken.refresh_token ?? token.refresh_token,
    }
  } catch (e) {
    console.error(e);

    return {
      ...token,
      error: 'Refresh token failed'
    }
  }
}
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECERT,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({token, account, user}) {
      if(account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accountTokenExpires: account.expires_at * 1000
        }
      }

      // Return the previous token if not expired
      if(Date.now() < token.accountTokenExpires) {
        return token;
      }

      // Refresh the token if expired
      return await refreshAccessToken(token)
    },

    async session({session, token}) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
    }
  }
}
export default NextAuth(authOptions)