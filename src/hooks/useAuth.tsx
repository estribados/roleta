import { signIn } from 'next-auth/react';
import { createContext, useContext } from 'react';

interface loginProps{
  email:string
  password:string
}

interface AuthContextData{
  googleAuth():void
  facebookAuth():void
}

interface Props{
  children?: JSX.Element | JSX.Element[]
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({children}:Props) =>{

  const googleAuth = () => {
    signIn('google')
  }
  const facebookAuth = () => {
    signIn('facebook')
  }
  const emailAndPassword = ({email,password}:loginProps) =>{
  }

  return(
    <AuthContext.Provider value ={{facebookAuth,googleAuth}}>
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

