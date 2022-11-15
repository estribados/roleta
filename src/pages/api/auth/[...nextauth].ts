import NextAuth from 'next-auth';
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";



export default NextAuth({
  providers: [
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'my-project',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     email: {
    //       label: 'email',
    //       type: 'email',
    //       placeholder: 'jsmith@example.com',
    //     },
    //     password: { label: 'Password', type: 'password' },
    //     tenantKey: {
    //       label: 'Tenant Key',
    //       type: 'text',
    //     },
    //   },
    //   async authorize(credentials:any, req) {
    //     const payload = {
    //       email: credentials.email,
    //       password: credentials.password,
    //     };

    //     const res = await fetch('http://localhost:5000/api/tokens', {
    //       method: 'POST',
    //       body: JSON.stringify(payload),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         tenant: credentials.tenantKey,
    //         'Accept-Language': 'en-US',
    //       },
    //     });

    //     console.log(res)

    //     const user = await res.json();
    //     if (!res.ok) {
    //       throw new Error(user.exception);
    //     }
    //     // If no error and we have user data, return it
    //     if (res.ok && user) {
    //       return user;
    //     }

    //     // Return null if user data could not be retrieved
    //     return null;
    //   },

      
    // }),
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
    async session({ session,user, token }:any) {

      session.user.accessToken = token.accessToken;
        
      return session;
    },
  }
});