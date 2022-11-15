import { signIn, signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { IUser } from 'interfaces/types';
import api from 'services/api';

interface loginProps{
  email:string
  password:string
}

interface UserProps{
  user:IUser
  status: any
}

interface AuthContextData{
  googleAuth():void
  facebookAuth():void
  emailAndPasswordAuth({email,password}:loginProps):Promise<void>
  signOutProvider():void
  user:UserProps | undefined
  status:'authenticated' | 'unauthenticated' | 'loading'
}

interface Props{
  children?: JSX.Element | JSX.Element[]
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
const AuthProvider = ({children}:Props) =>{

  const {status,data} = useSession()

  const [user,setUser] =useState<UserProps>(()=>{
    const {'nextAuth.user':user} = parseCookies()
    if(user){
      return {status:JSON.parse(user).status,user:JSON.parse(user)}
    }

    return {} as any
  })

  const findOrCreateUser = useCallback( async() =>{
    await api.post('users/findOne',{
      email: data?.user?.email,
      name:data?.user?.name
    }).then((response) =>{
      setCookie(undefined,'nextAuth.user',JSON.stringify({user:response.data,status}),{
        maxAge: 60 * 60 * 1, // 1 hora
      })
      setUser({user:response.data,status})
    })

  },[data?.user?.email, data?.user?.name, status])

  useEffect(() =>{
    setUser(previousState => {
      return { ...previousState, status }
    });
  },[status])

  const googleAuth = async () => {

    Promise.all([
      await signIn('google'),
      await findOrCreateUser()
    ])

  }
  const facebookAuth = async () => {
    Promise.all([
      await signIn('facebook'),
      await findOrCreateUser()
    ])
  }
  const emailAndPasswordAuth = async({email,password}:loginProps) =>{
    await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
      tenantKey: '12345',
      callbackUrl: `${window.location.origin}`,
    });
  }
  const signOutProvider = () =>{
    signOut({redirect:true})
    
    setUser({} as UserProps)
    destroyCookie(null,'nextAuth.user')
    router.push('/')
  }

  console.log(user)

  return(
    <AuthContext.Provider value ={{status,user,signOutProvider,facebookAuth,googleAuth,emailAndPasswordAuth}}>
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

