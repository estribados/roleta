import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useQuery } from 'react-query';

import Header from 'components/Header';
import { IUser } from 'interfaces/types';
import api from 'services/api';
import { Container } from 'styles/global';

const Usuarios:React.FC = (props) =>{

  const [userId,setUserId] = useState<string>()

  const {data:users} = useQuery<IUser[]>(['users'], async () =>{
    const response = await api.get('users/userSolicitations')
    return response.data
  })


  const approved = async ({solicitationId}:{solicitationId:string}) =>{
    const response = await api.get('solicitation/approved',{
      params:{
        solicitationId
      }
    })

    console.log(response.data)
  }

  return(
    <>
      <Header/>

        <h1 className='w-full text-4xl text-center mt-5'>USUÁRIOS</h1>
        <Container>
          <div className='w-full  h-full rounded-md shadow-md p-5 my-5'>
            <div className='mb-5'>
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
                    <th>Solicitações</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user:IUser) =>{
                    return(
                    <Fragment key={user.id} >
                      <tr >
                        <td>{user.name} {user.last_name}</td>
                        <td>{user.telephone}</td>
                        <td>{user.email}</td>
                        <td>{user.bank}</td>
                        <td>{user.pix}</td>
                        <td className={`${!!user.solicitations?.length && "flex items-center justify-center"}`}>
                          {!!user.solicitations?.length && 
                            <button className="tooltip w-5 h-5 rounded-full bg-green-600" data-tip="Solicitação Pendente"/>
                          }
                        </td>
                        <td onClick={() =>{setUserId(user.id)}}><MdOutlineKeyboardArrowDown cursor={'pointer'}/></td>
                      </tr>
                      {userId === user.id &&
                        <>
                          {user?.solicitations?.map((solicitation) =>(
                              <Fragment key={solicitation.id}>
                                <tr>
                                  <td className="w-full bg-slate-300 font-bold text-black">
                                    {moment(solicitation.createdAt).locale('pt-BR').format('LL')}
                                  </td>
                                  <td className="w-full bg-slate-300 font-bold text-black">
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(solicitation.value_solicitation)}
                                  </td>

                                  <td className="w-full bg-slate-300 font-bold text-black">
                                    {
                                      solicitation.status === 'SOLICITADO' && 
                                      <button onClick={() =>{approved({solicitationId:solicitation.id})}} className="btn btn-warning btn-sm ">Aprovar</button>
                                    }
                                  </td>
                                  <td className="w-full bg-slate-300 font-bold text-black"></td>
                                  <td className="w-full bg-slate-300 font-bold text-black"></td>
                                  <td className="w-full bg-slate-300 font-bold text-black"></td>
                                  <td className="w-full bg-slate-300 font-bold text-black"></td>
                                </tr>
                              </Fragment>
                          ))}
                        </>}
                    </Fragment>
                    )})}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
    </>
  )
}

export default Usuarios