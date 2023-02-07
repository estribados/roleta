/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useQuery } from "react-query";
import * as Yup from "yup";

import { useAuth } from "hooks/useAuth";
import { useConfirm } from "hooks/useConfirm";
import { INotifications } from "interfaces/types";
import api from "services/api";
import { queryClient } from "services/queryClient";
import { AdminActions } from "./Admin";

import ButtonGoldOutLined from "../Buttons/ButtonGold";
import { Container } from "./styles";
import { NotificationsContent } from "./Notifications";
import { Modal } from "./Modal";

const Header: React.FC = () => {
  const { confirm } = useConfirm();
  const { signOutProvider, authentication, status } = useAuth();
  const [authStatus, setAuthStatus] = useState(false);
  const [updateOn, setUpdateOn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      setAuthStatus(true);
    } else {
      setAuthStatus(false);
    }
  }, [status]);

  const { data: notifications } = useQuery<INotifications[]>(
    ["notifications", authentication?.user.id],
    async () => {
      if (authentication) {
        const response = await api.get("notifications/getNotificationsByUser", {
          params: {
            userId: authentication?.user.id,
          },
        });
        return response.data;
      }
    },
    {
      staleTime: 1200000, //20 minutos,
      cacheTime: 1200000,
      refetchOnWindowFocus: false,
    }
  );

  const updateNotifications = useCallback(async () => {
    if (authentication?.user.id) {
      await api.patch("notifications/update", {
        userId: authentication?.user.id,
      });
    }

    await queryClient.invalidateQueries("notifications");
  }, [authentication?.user.id]);

  const hasNotificationsNotVisualized = notifications?.some(
    (notification) => !notification.visualized
  );

  return (
    <Container>
      <div className="px-5 h-16 sticky z-10 flex-shrink-0 flex  bg-[rgba(0,0,0,0.5)]  ">
        <div className=" items-center max-w-5xl  mx-auto flex w-full justify-between">
          <Image
            onClick={() => {
              router.push("/");
            }}
            className="cursor-pointer"
            src={"/images/estribados.svg"}
            width={150}
            height={40}
            alt="logo do sistema"
          />
          {authStatus && (
            <>{authentication?.user.isAdmin && <AdminActions />}</>
          )}

          {authStatus ? (
            <div className="flex items-center rounded-xl gap-5">
              <NotificationsContent
                hasNotificationsNotVisualized={hasNotificationsNotVisualized}
                notifications={notifications}
                updateNotifications={updateNotifications}
              />

              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-circle swap swap-rotate">
                  <input type="checkbox" />
                  <div className="avatar">
                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={
                          "https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg"
                        }
                        alt={authentication?.user.name || ""}
                      />
                    </div>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  style={{ zIndex: 999999 }}
                  className={` dropdown-content menu p-2 shadow bg-base-100 rounded-box absolute z-50 right-0  text w-52 mt-4`}
                >
                  <li onClick={() => {}}>
                    <Link href={"/painel/roleta"}>
                      <a className="text-gold100">Roleta</a>
                    </Link>
                  </li>
                  <li
                    onClick={() =>
                      confirm({
                        title: "RESGATAR PRÊMIO",
                        text: "Apos solicitar um valor ele estara disponivel na conta registrada em ate 5 dias uteis",
                      })
                    }
                  >
                    <a className="text-gold100">Resgatar Saldo</a>
                  </li>
                  <li
                    onClick={() => {
                      setUpdateOn(true);
                    }}
                  >
                    <a className="text-gold100">Atualizar Perfil</a>
                  </li>

                  <li onClick={signOutProvider}>
                    <a className="flex items-center justify-center text-red-500 font-bold  bg-red-300">
                      Sair
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <a
              onClick={() => {
                router.push("/Login");
              }}
            >
              <ButtonGoldOutLined title="Entrar" />
            </a>
          )}
        </div>
      </div>
      {updateOn && <Modal openModal={setUpdateOn} hasOpen={updateOn} />}
    </Container>
  );
};

export default memo(Header);
