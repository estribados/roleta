/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";

import { ButtonMP } from "components/Buttons";
import HeaderRoullete from "components/HeaderRoullete";
import { useAuth } from "hooks/useAuth";
import { Container, Content, WppFlutuante } from "styles/roleta";
import api from "services/api";
import { useEffect, useState } from "react";
import { IRoullete, RoulleteQuotas } from "interfaces/types";
import CountUp from "react-countup";
import ProgressPrime from "components/ProgressPrime";

const DynamicComponentWithNoSSR = dynamic(() => import("components/Roullete"), {
  ssr: false,
});

const Roleta: React.FC = (quotas: any) => {
  const { authentication } = useAuth();
  const [roulletes, setRoulletes] = useState<IRoullete[]>([]);
  const [result, setResult] = useState<number>();
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    api
      .get("roulletes/getRoulletes", {
        params: {
          status: "ATIVA",
        },
      })
      .then((result) => {
        setRoulletes(result.data);
      });
  }, []);

  useEffect(() => {
    const maxValuer = quotas.data.reduce(function (prev: any, current: any) {
      return Number(prev.valueQuota) > Number(current.valueQuota)
        ? prev
        : current;
    });
    setMaxValue(Number(maxValuer.valueQuota));
  }, [quotas.data]);

  if (!authentication) {
    return <></>;
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "absolute",
        top: "0",
        backgroundImage: "url(/images/caverna-home.webp)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "70%",
      }}
    >
      <Container className="mt-[4.5rem]">
        <HeaderRoullete roulletes={roulletes} />
        <ProgressPrime
          maxValue={Number(maxValue)}
          bonus={
            authentication?.user.bonus >= 0
              ? +Number(authentication.user.bonus).toFixed(2)
              : 0
          }
        />

        <Content>
          <section className="w-full md:max-w-md">
            <div className="mb-5 md:mb-0 md:h-full px-2 flex flex-col">
              <h1 className="text-5xl text-yellow-300">
                SALDO DISPONIVEL <br />
                <span className="font-extrabold text-5xl block mb-5">
                  <CountUp
                    decimals={2}
                    prefix={"R$"}
                    style={{
                      color: "yellow",
                    }}
                    className={"text-5xl"}
                    start={(authentication?.user.credits || 0) - (result || 0)}
                    end={authentication?.user.credits || 0}
                    duration={1}
                  />
                </span>
              </h1>
              <div>
                <div className="md:flex text-2xl md:text-3xl flex justify-center items-center w-full md:h-16 h-10 bg-black border-solid border-2 border-gold100 font-bold bg-opacity-60 rounded-md">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(result || 0)}
                </div>

                <div className="md:mt-5 mt-2">
                  <ButtonMP animation>
                    <div className="md:text-2xl text-sm flex items-center justify-center">
                      COMPRAR CREDITOS
                    </div>
                  </ButtonMP>
                </div>
              </div>
            </div>
          </section>
          <DynamicComponentWithNoSSR
            getResult={setResult}
            item={quotas as RoulleteQuotas}
          />
        </Content>
      </Container>

      <WppFlutuante
        className="whatsapp-link"
        href={`https://api.whatsapp.com/send?phone=5508597222938&text=Meu nome é ${authentication.user.name} e meu email ${authentication.user.email}, gostaria de tirar algumas duvidas sobre a roleta`}
        target="blank"
      >
        <img src="/svg/wpp.svg" alt="" />
      </WppFlutuante>
    </div>
  );
};

export default Roleta;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { id } = query;

  const response = await api.get(`roulletes/getRoullete`, {
    params: {
      id,
    },
  });

  const result = { roullete: response.data, data: response.data.quotas };
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: result,
  };
};
