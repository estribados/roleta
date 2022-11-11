import React from 'react'

import Header from 'components/Header'
import { Container } from 'styles/global'

const Usuarios:React.FC = () =>{
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
                  <tr >
                    <td>Leandro santos do nascimento</td>
                    <td>8599881760</td>
                    <td>lsn_slim@yahoo.com.br</td>
                    <td>Nubank</td>
                    <td>324235325634</td>
                    <td className='text-center' >R$ 1200.00</td>
                    <td>
                      <button className="btn btn-warning btn-sm mb-2">Aprovar</button>
                    </td>
                  </tr>
                  <tr >
                    <td>Leandro santos do nascimento</td>
                    <td>8599881760</td>
                    <td>lsn_slim@yahoo.com.br</td>
                    <td>Nubank</td>
                    <td>324235325634</td>
                    <td className='text-center' >R$ 1200.00</td>
                    <td>
                      <button className="btn btn-warning btn-sm mb-2">Aprovar</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Leandro santos do nascimento</td>
                    <td>8599881760</td>
                    <td>lsn_slim@yahoo.com.br</td>
                    <td>Nubank</td>
                    <td>324235325634</td>
                    <td className='text-center' >R$ 1200.00</td>
                    <td>
                      <button className="btn btn-warning btn-sm mb-2">Aprovar</button>
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
export default Usuarios