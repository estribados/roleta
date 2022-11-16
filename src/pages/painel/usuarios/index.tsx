import React from 'react'

import Header from 'components/Header'
import { IUser } from 'interfaces/types'
import { prisma } from 'lib/prisma'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Container } from 'styles/global'

const Usuarios:React.FC = (props) =>{
  const {users} = props as any
  return(
    <>
      <Header/>

        <h1 className='w-full text-4xl text-center mt-5'>USUÁRIOS</h1>
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
                    <th className='absolute -z-10'>Nome</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Banco</th>
                    <th>Pix</th>
                    <th className='text-center'>Valor Solicitado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {users.map((user:IUser) =>{
                    return(

                    <tr key={user.id} >
                      <td>{user.name} {user.last_name}</td>
                      <td>{user.telephone}</td>
                      <td>{user.email}</td>
                      <td>{user.bank}</td>
                      <td>{user.pix}</td>
                      <td className='text-center' >R$ 1200.00</td>
                      <td>
                        <button className="btn btn-warning btn-sm mb-2">Aprovar</button>
                      </td>
                    </tr>
                    )
                  })}
                  
                </tbody>
              </table>
            </div>
          </div>
        </Container>
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async ({req}) =>{
  const users = await prisma.user.findMany()
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
    props:{
      users:JSON.parse(JSON.stringify(users))
    }
  }
}
export default Usuarios