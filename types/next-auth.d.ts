import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id:string
      isAdmin:boolean
      last_name:string
      telephone:string
      pix:string
      bank:string
      credits:number
    } & DefaultSession["user"]
  }
}