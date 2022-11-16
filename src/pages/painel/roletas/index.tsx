import React from 'react'

import { ButtonGold } from 'components/Buttons'
import Header from 'components/Header'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { Container } from 'styles/global'

const Roletas:React.FC = () =>{
  return(
    <>
      <Header/>

        <div className='px-5 mt-5 mx-auto  max-w-[1140px] flex justify-between items-center'>
        <h1 className='w-full text-2xl  md:text-4xl'>ROLETAS</h1>
        <Link href={'roletas/cadastro'}>
        <ButtonGold title={'Cadastrar'}/>
        </Link>
        </div>
        <Container>
          <div className='w-full  h-full rounded-md shadow-md p-5 my-5'>
            <div className='mb-5'>
              {/* <h1 className='mb-5 text-3xl'>Filtros</h1>
              <div className='flex flex-wrap gap-5'>
                <input type="text" placeholder="Banco" className="bg-white input input-bordered input-warning w-full max-w-xs" />
                <select className="select select-warning w-full max-w-xs bg-white">
                    <option disabled selected>Filtro por Aprovar</option>
                    <option>Todos</option>
                    <option>Aprovar</option>
                </select>
              </div> */}
            
            </div>
            <div className="overflow-x-auto ">
              <table className=" table table-compact  w-full">
                <thead>
                  <tr className='text-left'>
                    <th>Categoria</th>
                    <th>Valor</th>
                    <th className='text-center'>N de cotas</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td>Prata</td>
                    <td>1 real</td>
                    <td className='text-center'>25</td>
                    <td>
                      <button className="btn btn-primary btn-sm mb-2">Ver</button>
                    </td>
                  </tr>
                  <tr >
                    <td>Prata</td>
                    <td>1 real</td>
                    <td className='text-center'>25</td>
                    <td>
                      <button className="btn btn-primary btn-sm mb-2">Ver</button>
                    </td>
                  </tr>
                  <tr>
                      <td>Prata</td>
                      <td>1 real</td>
                      <td className='text-center'>25</td>
                      <td>
                        <button className="btn btn-primary btn-sm mb-2">Ver</button>
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({req}) =>{
  const session = await getSession({req})

  if(!session?.user.isAdmin){
    return {
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }

  return {
    props:{}
  }
}
export default Roletas