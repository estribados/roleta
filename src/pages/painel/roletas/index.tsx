import React from "react";

import { ButtonGold } from "components/Buttons";
import Header from "components/Header";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Container } from "styles/global";
import { useQuery } from "react-query";
import api from "services/api";
import { IRoullete } from "interfaces/types";
import Switch from "react-switch";
import SwitchRoullete from "components/Switch";
import { queryClient } from "services/queryClient";

const Roletas: React.FC = () => {
  const { data: roulletes } = useQuery<IRoullete[]>(
    ["roulletesteste"],
    async () => {
      const response = await api.get("roulletes/getRoulletes");
      return response.data;
    }
  );

  const handleDelete = async (id: string) => {
    const hasConfirm = confirm("Essa ação não podera ser desfeita");

    if (!hasConfirm) {
      return;
    }

    await api.post(`roulletes/handleDelete`, {
      id,
    });

    await queryClient.invalidateQueries("roulletesteste");
  };

  return (
    <>
      <div className="px-5 mt-5 mx-auto  max-w-[1140px] flex justify-between items-center">
        <h1 className="w-full text-2xl  md:text-4xl">ROLETAS</h1>

        <Link href={"roletas/cadastro"}>
          <ButtonGold title={"Cadastrar"} />
        </Link>
      </div>
      <Container>
        <div className="w-full  h-full rounded-md  py-5 ">
          <div className="mb-5">
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
                <tr className="text-left">
                  <th>Categoria</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <>
                  {roulletes?.map((roullete) => (
                    <tr key={roullete.id}>
                      <td>{roullete.nameCategory}</td>
                      <td>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(roullete.price_roullete)}
                      </td>
                      <td>{roullete.status}</td>
                      <td className="flex items-center justify-around gap-2 text-center">
                        <Link className="mr-2" href={`roletas/${roullete.id}`}>
                          <a>
                            <button className="btn btn-primary btn-sm mb-2">
                              Ver
                            </button>
                          </a>
                        </Link>

                        <SwitchRoullete
                          roulleteId={roullete.id}
                          active={roullete.status === "ATIVA" ? true : false}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            handleDelete(roullete.id);
                          }}
                          className="btn btn-error btn-sm"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default Roletas;
