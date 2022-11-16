import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import api from 'services/api';

export default NextAuth({
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
      clientId: '130175532944-akiu2dgbpgjrde803c09r1rsurfm0ugo.apps.googleusercontent.com',
      clientSecret: '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',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: '601537231658340',
      clientSecret:'3b498088acc408dd3e1f1314efd5fda6'
    }),
  ],
  callbacks:{
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },
    
    async session({ session, user, token }:any) {
     const result =  await api.post('users/find',{
        email: session.user.email,
      })


      const newSession ={
        ...session,
        user:{
          ...result.data,
          image:session.user.image
        },
      }

      return session = newSession
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
});