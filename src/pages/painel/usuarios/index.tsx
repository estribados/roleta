import moment from "moment";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { Fragment, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useQuery } from "react-query";
import { useAuth } from "hooks/useAuth";
import { useToast } from "hooks/useToast";
import { IUser } from "interfaces/types";
import api from "services/api";
import { queryClient } from "services/queryClient";
import { Container } from "styles/global";

import { InputMask } from "components/Form";
import { ButtonGold } from "components/Buttons";

interface ApproveProps {
  solicitationId: string;
  value_solicitation: number;
  creditsByUser: number;
  userId: string;
  typeSolicitation: "approve" | "recuse";
}

interface DataUsers {
  users: IUser[];
  house_profit: number;
}

const Usuarios: React.FC = (props) => {
  const [userId, setUserId] = useState<string>();
  const [userIdUpdateCredits, setUserIdUpdateCredits] = useState<string>();
  const [textDescription, setTextDescription] = useState("");
  const [credits, setCredits] = useState("");
  const { authentication, setAuthentication } = useAuth();
  const { notify } = useToast();

  const { data } = useQuery<DataUsers>(["users"], async () => {
    const response = await api.get("users/userSolicitations");
    return response.data;
  });

  const approvedOrRecuse = async ({
    solicitationId,
    creditsByUser,
    value_solicitation,
    userId,
    typeSolicitation,
  }: ApproveProps) => {
    try {
      if (typeSolicitation === "approve") {
        const response = await api.patch("solicitation/approved", {
          solicitationId,
          creditsByUser,
          value_solicitation,
          userId,
        });

        const previousUsers = queryClient.getQueryData<DataUsers>("users");

        if (!!previousUsers) {
          const nextRepos = previousUsers?.users.map((user: IUser) => {
            if (user?.id === response.data.userId) {
              return {
                ...user,
                credits: response.data.credits,
                solicitations: [],
              };
            } else {
              return user;
            }
          });

          if (authentication) {
            setAuthentication({
              expires: authentication?.expires,
              user: {
                ...authentication.user,
                credits: response.data.credits,
                solicitations: [],
              },
            });
          }
          queryClient.setQueriesData("users", { ...data, users: nextRepos });
        }

        notify({
          message: "Solicitação aprovada",
          types: "success",
        });
      } else {
        await api.patch("notifications/desaprovedSolicitation", {
          userId,
          solicitationId,
          textDescription,
        });
        if (authentication) {
          setAuthentication({
            expires: authentication?.expires,
            user: {
              ...authentication.user,
              solicitations: [],
            },
          });
        }

        await queryClient.invalidateQueries("users");

        notify({
          message: "O usuário foi notificado",
          types: "info",
        });
      }
    } catch (err: any) {
      notify({
        message: err.response?.data?.err,
        types: "error",
      });
    }
  };

  const updateCredits = async (id: string) => {
    await api.patch("users/updateManualCredits", {
      userId: id,
      credits,
    });

    setCredits("");
    setUserId("");

    notify({
      message: "Credito adicionado",
      types: "info",
    });

    await queryClient.invalidateQueries("users");
  };

  const roundBonus = async () => {
    const hasConfirm = confirm(
      "Apos confirmar sera distribuido 40% do lucro pelas roletas"
    );

    if (!hasConfirm) {
      return;
    }

    await api.post("roulletes/roundBonus", {
      house_profit: data?.house_profit,
    });
  };

  return (
    <>
      <h1 className="w-full text-4xl text-center mt-5">USUÁRIOS</h1>

      <Container>
        <div className="w-full h-full rounded-md py-5">
          <div className="mb-5"></div>
          <div className="overflow-x-auto ">
            <table
              data-theme="dark"
              className=" table table-compact bg-black  w-full"
            >
              <thead>
                <tr className="text-left">
                  <th className="absolute -z-10">Nome</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>Creditos disponiveis</th>
                  <th>Valor das vitorias</th>
                  <th>Lucro da casa</th>
                  <th>Valor do bonus</th>
                  <th>Banco</th>
                  <th>Pix</th>
                  <th>Solicitações</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.users?.map((user: IUser) => {
                  return (
                    <Fragment key={user?.id}>
                      <tr>
                        <td>
                          {user?.name} {user?.last_name}
                        </td>
                        <td>{user?.telephone}</td>
                        <td>{user?.email}</td>
                        <td className="">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(user.credits)}
                        </td>
                        <td className="">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(user.user_profit)}
                        </td>
                        <td
                          className={`
                          ${
                            Number(user.house_profit) -
                              Number(user.user_profit) <
                            0
                              ? "text-red-400"
                              : "text-green-400"
                          }`}
                        >
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(
                            Number(user.house_profit) - Number(user.user_profit)
                          )}
                        </td>
                        <td>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(user.bonus)}
                        </td>
                        <td>{user?.bank}</td>
                        <td>{user?.pix}</td>
                        <td>
                          <div
                            className={`${
                              !!user?.solicitations?.length &&
                              "flex items-center justify-center"
                            }`}
                          >
                            {!!user?.solicitations?.length && (
                              <button
                                className="tooltip w-5 h-5 rounded-full bg-green-600"
                                data-tip="Solicitação Pendente"
                              />
                            )}
                          </div>
                        </td>
                        <td
                          onClick={() => {
                            setUserId(user.id);
                          }}
                        >
                          {!!user?.solicitations?.length && (
                            <MdOutlineKeyboardArrowDown cursor={"pointer"} />
                          )}
                        </td>
                        <td className="flex flex-col">
                          {userIdUpdateCredits === user.id ? (
                            <>
                              <InputMask
                                placeholder={`Valor do credito`}
                                maskType="money"
                                classStyle="bg-gray-200 placeholder:text-gray-400 text-gray-500 text input input-bordered input-warning w-full input-sm  rounded-md mb-1 "
                                onChangeCurrency={({
                                  formattedValue,
                                  value,
                                }: any) => {
                                  setCredits(value);
                                }}
                              />
                              <button
                                onClick={() => {
                                  updateCredits(user.id);
                                }}
                                className="btn btn-warning btn-sm"
                              >
                                Salvar
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                setUserIdUpdateCredits(user.id);
                              }}
                              className="btn btn-warning btn-sm"
                            >
                              Adicionar creditos
                            </button>
                          )}
                        </td>
                      </tr>
                      {userId === user?.id && (
                        <>
                          {user?.solicitations?.map((solicitation) => (
                            <Fragment key={solicitation.id}>
                              <tr>
                                <td className="w-full bg-slate-300 font-bold text-black">
                                  {moment(solicitation.createdAt)
                                    .locale("pt-br")
                                    .format("LLLL")}
                                </td>
                                <td className="w-full bg-slate-300 font-bold text-black">
                                  {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  }).format(solicitation.value_solicitation)}
                                </td>

                                <td className="w-full bg-slate-300 font-bold text-black">
                                  {solicitation.status === "SOLICITADO" && (
                                    <>
                                      <button
                                        onClick={() => {
                                          approvedOrRecuse({
                                            solicitationId: solicitation.id,
                                            value_solicitation:
                                              solicitation.value_solicitation,
                                            creditsByUser: user.credits,
                                            userId: user.id,
                                            typeSolicitation: "approve",
                                          });
                                        }}
                                        className="mr-5 btn btn-warning btn-sm "
                                      >
                                        Aprovar
                                      </button>

                                      <div className=" dropdown dropdown-right">
                                        <button
                                          tabIndex={0}
                                          className=" btn btn-error btn-sm m-1"
                                        >
                                          Recusar
                                        </button>
                                        <ul
                                          tabIndex={0}
                                          className="dropdown-content  p-2 shadow bg-slate-200 rounded-box "
                                        >
                                          <div className="flex flex-col items-center md:w-80 w-60">
                                            <h6 className="text-sm">
                                              Texto da notificação
                                            </h6>
                                            <input
                                              onChange={(e) => {
                                                setTextDescription(
                                                  e.target.value
                                                );
                                              }}
                                              type="text"
                                              placeholder="Mensagem de notificação para o usuário"
                                              className="input my-3 bg-white input-warning input-bordered input-sm w-full max-w-xs"
                                            />
                                            <button
                                              onClick={() => {
                                                approvedOrRecuse({
                                                  solicitationId:
                                                    solicitation.id,
                                                  value_solicitation:
                                                    solicitation.value_solicitation,
                                                  creditsByUser: user.credits,
                                                  userId: user.id,
                                                  typeSolicitation: "recuse",
                                                });
                                              }}
                                              className="btn btn-outline btn-warning w-full btn-sm"
                                            >
                                              Enviar
                                            </button>
                                          </div>
                                        </ul>
                                      </div>
                                    </>
                                  )}
                                </td>
                                <td className="w-full bg-slate-300 font-bold text-black"></td>
                                <td className="w-full bg-slate-300 font-bold text-black"></td>
                                <td className="w-full bg-slate-300 font-bold text-black"></td>
                                <td className="w-full bg-slate-300 font-bold text-black"></td>
                                <td className="w-full bg-slate-300 font-bold text-black"></td>
                                <td className="w-full bg-slate-300 font-bold text-black"></td>
                                <td className="w-full bg-slate-300 font-bold text-black"></td>
                                <td className="w-full bg-slate-300 font-bold text-black"></td>
                                <td className="w-full bg-slate-300 font-bold text-black"></td>
                              </tr>
                            </Fragment>
                          ))}
                        </>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full flex justify-end items-center">
          <ButtonGold
            onClick={roundBonus}
            style={{ marginRight: "10px" }}
            title={"Ativar rodada bonus"}
          />
          <h3 className="mr-3">Lucro geral :</h3>
          <span
            className={`font-semibold text-2xl ${
              Number(data?.house_profit) < 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data?.house_profit || 0)}
          </span>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Usuarios;
