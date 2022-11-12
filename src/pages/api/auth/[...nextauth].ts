import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    CredentialsProvider({
      type:'credentials',
      credentials:{},
      authorize(credentials:any,request:any){
        const {email,password} = credentials as {email:string; password:string}

        if(email !== 'llsn_slim' && password !== '1234'){
          return null
        }

        return {id:'1',email:"lll", password:'23'}
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
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log(account)
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
});