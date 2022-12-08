import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import api from 'services/api';

export const authOptions: NextAuthOptions = {
  pages:{
    signIn:'/',
    signOut:'/',
  },
  jwt: {
    maxAge: 100000,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: {  label: "password", type: "password" }
      },

      async authorize(credentials, req) {
        const response = await api.post('users/login',{
          email:credentials?.email,
          password:credentials?.password
       })
        if(response.data){
          return response.data;
        }else{
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FRESHBOOKS_CLIENT_ID as string,
      clientSecret: process.env.FRESHBOOKS_CLIENT_SECRET as string
    }),
  ],
  callbacks:{
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },
    
    async session({ session, user, token }:any) {
      if(token){

        const result =  await api.post('users/find',{
            email: session.user.email,
          })

          const newSession ={
            ...session,
            user:{
              image:session.user.image,
              ...result.data
            },
          }

          return session = newSession

        }

      return session

      },
    async signIn({ user, account, profile, email, credentials }) {
      if(user){
        await api.post('users/findOrCreate',{
          email: user.email,
          name:user.name
        })
      return true
      }
      return false
    },
  }
}

export default NextAuth(authOptions);