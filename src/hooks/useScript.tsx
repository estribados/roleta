import Script from 'next/script'
import { createContext, useContext, useState } from 'react'

interface ScriptContextState{
  MercadoPago:any
}
interface Props{
  children:JSX.Element | JSX.Element[]
}

//iniciando um contexto vazio precisa colocar o as e o nome da interface
const ScriptContext = createContext<ScriptContextState>({} as ScriptContextState)

const ScriptProvider = ({children}:Props) => {

  const [MercadoPago,setMercadoPago] = useState<any>(null)

  return (
    <ScriptContext.Provider value ={{MercadoPago}}>
      <Script
        id="mp-js"
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => {
          setMercadoPago(new (window as any).MercadoPago(process.env.NEXT_PUBLIC_KEY_MP,
          {
            locale: 'pt-BR'
          }))
        }}
        />
      {children}
     </ScriptContext.Provider>
  )
}

function useScript(): ScriptContextState{
  const context = useContext(ScriptContext)

  if(!context) {
    throw new Error('insira o ScriptProvider ao redor do seu elemento')
  }
  return context
}

export { ScriptProvider, useScript }

