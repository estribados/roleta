import { Dialog } from "@headlessui/react";
import React, { ReactNode, useRef, useState } from "react";

import { useAuth } from "hooks/useAuth";
import { useConfirm } from "hooks/useConfirm";
import { useToast } from "hooks/useToast";
import api from "services/api";
import { queryClient } from "services/queryClient";

import { ButtonConfirm, CancelButton } from "./styles";
import { InputMask } from "components/Form";

interface ConfirmProps {
  text?: string;
  title?: string;
  hasConfirm?: boolean;
  valueRescue?: string;
}

interface IModalDeleteContentProps {
  icon?: ReactNode;
  text?: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  hasInputValue: boolean;
  handleConfirm: (confirm: ConfirmProps) => void;
}

const ModalDeleteContent: React.FC<IModalDeleteContentProps> = ({
  icon,
  setIsOpen,
  title,
  text,
  handleConfirm,
  hasInputValue,
}) => {
  const cancelButtonRef = useRef(null);
  const { confirmation, confirm } = useConfirm();
  const { authentication, setAuthentication } = useAuth();
  const { notify } = useToast();
  const [hasSolicitations, setHasSolicitations] = useState(
    !!authentication?.user?.solicitations?.length
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const solicitaton = async () => {
    try {
      handleConfirm({ ...confirmation, hasConfirm: true });

      await api
        .post("/solicitation/create", {
          userId: authentication?.user.id,
          value_solicitation: Number(confirmation.valueRescue),
        })
        .then((response) => {
          if (authentication) {
            setAuthentication({
              ...authentication,
              user: {
                ...authentication.user,
                solicitations: [
                  ...authentication.user.solicitations,
                  response.data,
                ],
              },
            });

            setIsOpen(false);
            setTimeout(() => {
              setHasSolicitations(!!authentication.user.solicitations.length);
              handleConfirm({ hasConfirm: false });
            }, 500);
          }

          queryClient.invalidateQueries("users");
        });
      notify({
        message:
          "Solicitação em andamento, em até 5 dias uteis o valor estará disponivel na conta registrada",
        types: "info",
      });
    } catch (err: any) {
      notify({
        message: err?.response?.data?.err,
        types: "info",
      });
    }
  };

  // const handleKeyUp = (e:FormEvent<HTMLInputElement>) =>{
  //   let value = e.currentTarget.value
  //   value = value.replace(/\D/g,"")

  //   const currencyFormat = new Intl.NumberFormat('pt-BR',{
  //     style:  'currency',
  //     currency:   'BRL'
  //   }).format(Number(value)/100)

  //   e.currentTarget.value = currencyFormat

  // }

  return (
    <>
      <div>
        <div className="mx-auto flex items-center justify-center rounded-full">
          {icon}
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <Dialog.Title
            as="h3"
            className="leading-6 text-2xl font-bold text-gold100"
          >
            {title}
          </Dialog.Title>
          <div className="mt-4 md:px-16 px-5 text-black">{text}</div>
          {hasInputValue && (
            <div className="mt-5">
              {hasSolicitations ? (
                <strong className="text-red-400">
                  Você ja tem solicitações em andamento qualquer duvida entre em
                  contato com o suporte
                </strong>
              ) : (
                <div className="flex items-center justify-center">
                  <label
                    className="text-gray-500 font-bold"
                    htmlFor="valorDisponivel"
                  >
                    Valor:
                  </label>

                  <InputMask
                    placeholder={`Valor disponivel ${new Intl.NumberFormat(
                      "pt-BR",
                      { style: "currency", currency: "BRL" }
                    ).format(authentication?.user.credits || 0)}`}
                    maskType="money"
                    classStyle="bg-gray-200 placeholder:text-gray-400 text-gray-500 text input input-bordered input-warning w-full max-w-xs rounded-md ml-0 md:ml-5"
                    onChangeCurrency={({ formattedValue, value }: any) => {
                      confirm({
                        ...confirmation,
                        valueRescue: value,
                      });
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense ">
        <ButtonConfirm
          className={`${hasSolicitations && "bg-gray-400 cursor-not-allowed"} `}
          disabled={hasSolicitations}
          onClick={solicitaton}
        >
          Confirmar
        </ButtonConfirm>
        <CancelButton
          type="button"
          onClick={() => {
            handleConfirm({ ...confirmation, hasConfirm: false });
            setIsOpen(false);
          }}
          ref={cancelButtonRef}
        >
          Voltar
        </CancelButton>
      </div>
    </>
  );
};

export { ModalDeleteContent };
