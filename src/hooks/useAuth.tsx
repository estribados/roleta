import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';

import { IUser } from 'interfaces/types';

import { useToast } from './useToast';

interface loginProps{
  email:string
  password:string
}

interface UserProps{
  user?:IUser
  status?: 'authenticated' | 'unauthenticated' | 'loading' 
}

interface AuthContextData{
  googleAuth():void
  facebookAuth():void
  emailAndPasswordAuth({email,password}:loginProps):Promise<void>
  signOutProvider():void
  status:'authenticated' | 'unauthenticated' | 'loading'
  authentication:Session | null
}

interface Props{
  children?: JSX.Element | JSX.Element[]
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
const AuthProvider = ({children}:Props) =>{

  const {status,data:authentication} = useSession()
  const {notify} = useToast()
  const router = useRouter()
  
  const googleAuth = async () => {
    await signIn('google')
  }
  const facebookAuth = async () => {
    await signIn('facebook',)
  }
  const emailAndPasswordAuth = async({email,password}:loginProps) =>{
   await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    }).then((response) =>{
      if(response?.status === 401){
        notify({
          message:"Email ou senha incorretos",
          types:'error'
        })
      }else if(response?.status === 404){
        notify({
          message:"Usuário não encontrado",
          types:'error'
        })
      }else if(response?.ok){
        notify({
          message:`Bem-vindo`,
          types:'success'
        })
        router.push('/painel/roleta')
      }
    })

  }
  const signOutProvider = async () =>{
    await signOut({redirect:true})
    await router.push('/')
  }


  return(
    <AuthContext.Provider value ={{authentication,status,signOutProvider,facebookAuth,googleAuth,emailAndPasswordAuth}}>
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

