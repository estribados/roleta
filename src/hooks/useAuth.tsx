import { IUser } from 'interfaces/types';
import { signIn, useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import api from 'services/api';

interface loginProps{
  email:string
  password:string
}

interface AuthContextData{
  googleAuth():void
  facebookAuth():void
  emailAndPasswordAuth({email,password}:loginProps):Promise<void>
  user:IUser | undefined
  status:'authenticated' | 'unauthenticated' | 'loading'
}

interface Props{
  children?: JSX.Element | JSX.Element[]
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)
const AuthProvider = ({children}:Props) =>{

  const {status,data} = useSession()
  const [user,setUser] = useState<IUser>()

  const googleAuth = async () => {
    signIn('google')
  }
  const facebookAuth = () => {
    signIn('facebook')
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
 
  useEffect(() =>{
    api.post('users/findOne',{
        email: data?.user?.email,
        name:data?.user?.name
      }).then((response) =>{
      setUser(response.data)
    })
  },[data?.user?.email, data?.user?.name])


  console.log(data)

  return(
    <AuthContext.Provider value ={{status,user,facebookAuth,googleAuth,emailAndPasswordAuth}}>
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

