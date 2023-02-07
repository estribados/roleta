import { useRouter } from "next/router";
import React, { ButtonHTMLAttributes, useCallback, useState } from "react";
import { FiX } from "react-icons/fi";

import { DefaultModal } from "components/Modals/DefaultModal";
import { useAuth } from "hooks/useAuth";
import { useToast } from "hooks/useToast";
import api from "services/api";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { InputMask } from "components/Form";

import { Container, ContainerAnimated, QrCodeContainer } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  animation?: boolean;
  textSize?: string;
  children?: JSX.Element | string | JSX.Element[];
}

interface PaymentProps {
  qrCode?: string;
  keyPix?: string;
  valuePix: number;
  status?: "pending" | "approved";
}

const ButtonMP: React.FC<ButtonProps> = ({
  animation,
  textSize,
  children,
  ...rest
}) => {
  const { push } = useRouter();
  const { notify } = useToast();
  const { authentication } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [credits, setCredits] = useState("");
  const [payment, setPayment] = useState<PaymentProps>();
  const buyCredits = useCallback(async () => {
    const response = await api.post("mercadoPago/createPayment", {
      creditSolicitation: Number(credits),
    });

    setPayment({
      qrCode:
        response.data.point_of_interaction.transaction_data.qr_code_base64,
      keyPix: response.data.point_of_interaction.transaction_data.qr_code,
      valuePix: response.data.transaction_details.total_paid_amount,
      status: response.data.status,
    });

    notify({
      message: "Gerando codigo pix",
      types: "info",
    });
  }, [credits, notify]);

  const copyToClipboard = () => {
    copy(payment?.keyPix || "");
    notify({
      message: `Chave copiada para a área de transferência`,
      types: "success",
    });
  };

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <div className="">
      <ContainerAnimated
        onClick={() => {
          // !!authentication ? setOpenModal(true) : push("/Login");
        }}
        animation={animation}
      >
        <Container
          className="flex items-center justify-center w-full h-full text-white"
          {...rest}
        >
          {children}
        </Container>
      </ContainerAnimated>
      <DefaultModal
        width="100%"
        margin="auto 0"
        isOpen={openModal}
        setIsOpen={() => {
          setOpenModal(true);
        }}
        content={
          <div className="">
            <header className="flex w-full justify-between items-center text-black mb-5">
              Compra de creditos
              <FiX
                cursor={"pointer"}
                onClick={() => {
                  reloadSession();
                  setPayment({ valuePix: 0 });
                  setOpenModal(false);
                }}
              />
            </header>

            <div className="mx-auto w-full max-w-sm flex items-center justify-center flex-col">
              <h1 className="text-gold100 font-bold">
                Digite o valor de creditos que ira comprar
              </h1>

              <InputMask
                placeholder={`Valor disponivel ${new Intl.NumberFormat(
                  "pt-BR",
                  { style: "currency", currency: "BRL" }
                ).format(authentication?.user.credits || 0)}`}
                maskType="money"
                classStyle="bg-gray-200 placeholder:text-gray-400 text-gray-500 text input input-bordered input-warning w-full  rounded-md ml-0 my-3"
                onChangeCurrency={({ formattedValue, value }: any) => {
                  setCredits(value);
                }}
              />
              {payment?.qrCode && (
                <QrCodeContainer>
                  <div>
                    <h1 className="font-bold">Valor do pix</h1>
                    <h3>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(payment.valuePix)}
                    </h3>
                    <h3 className="font-bold">Chave Pix</h3>
                    <div className=" bg-white">
                      <div className="input-group flex items-center">
                        <input
                          type="text"
                          placeholder="Search…"
                          value={payment.keyPix}
                          className="input text-black input-bordered w-full input-warning   bg-slate-100 my-3 input-sm"
                        />
                        <button
                          onClick={copyToClipboard}
                          className="btn  btn-sm"
                        >
                          Copiar
                        </button>
                      </div>
                    </div>
                  </div>
                  <Image
                    src={`data:image/jpeg;base64,${payment.qrCode}`}
                    alt="Picture of the author"
                    width="274px"
                    height="274px"
                  />
                </QrCodeContainer>
              )}

              <button
                onClick={buyCredits}
                className="w-full btn btn-outline btn-warning"
              >
                Gerar Qr-code
              </button>
              <div></div>
            </div>
          </div>
        }
      />
    </div>
  );
};
export { ButtonMP };
