import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';

import { IUser } from 'interfaces/types';
import api from 'services/api';

import { useToast } from './useToast';

interface loginProps{
  email:string
  password:string
}

interface UserProps{
  user:IUser
  status: 'authenticated' | 'unauthenticated' | 'loading'
}

interface AuthContextData{
  googleAuth():void
  facebookAuth():void
  emailAndPasswordAuth({email,password}:loginProps):Promise<void>
  signOutProvider():void
  status:'authenticated' | 'unauthenticated' | 'loading'
  authentication:Session | null
  user:UserProps
}

interface Props{
  children?: JSX.Element | JSX.Element[]
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
const AuthProvider = ({children}:Props) =>{

  const {status,data:authentication} = useSession()
  const {notify} = useToast()
  const router = useRouter()
  
  const [user,setUser] =useState<UserProps>(()=>{
    const {'nextAuthUser':user} = parseCookies()
    if(user){
      return {status:JSON.parse(user).status,user:JSON.parse(user)}
    }

    return {} as any
  })


  useEffect( () =>{
    if(status === 'authenticated'){

     api.post('users/find',{
        email: authentication?.user.email,
      }).then((response) =>{
        setCookie(undefined,'nextAuthUser',JSON.stringify({user:response.data,status}),{
          maxAge: 60 * 60 * 1, // 1 hora
        })
        setUser({user:response.data,status})
      })
    }

  },[authentication?.user.email, status])

  const googleAuth = async () => {
    Promise.all([
      await signIn('google'),
    ])

  }
  const facebookAuth = async () => {
    Promise.all([
      await signIn('facebook'),
    ])
  }
  const emailAndPasswordAuth = async({email,password}:loginProps) =>{
   await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    }).then((response) =>{
      if(response?.status === 401){
        notify({
          message:"Usuário não encontrado",
          types:'error'
        })
      }

      if(response?.ok){
        notify({
          message:"Bem-vindo",
          types:'success'
        })
      }
    })

  }
  const signOutProvider = () =>{
    signOut({redirect:true})
    
    destroyCookie(null,'nextAuthUser')
    router.push('/')
  }

  return(
    <AuthContext.Provider value ={{user,authentication,status,signOutProvider,facebookAuth,googleAuth,emailAndPasswordAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if(!context){
    throw new Error('useAuth must be used AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth };

