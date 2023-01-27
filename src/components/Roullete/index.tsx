import { useAuth } from "hooks/useAuth";
import { useToast } from "hooks/useToast";
import { useWin } from "hooks/useWin";
import { RoulleteQuotas } from "interfaces/types";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import api from "services/api";
import { staticData } from "utils/staticRoullete";
import { currencyFormat } from "utils/currencyNumber";
import { Arrow, Container, RoulleteContainer, Spin } from "./styles";
import { type } from "os";

interface RoulleteProps {
  staticItens?: boolean;
  item?: RoulleteQuotas | undefined;
  disabled?: boolean;
  setStopRoullet?(value: boolean): void;
  getResult?(value: number): void;
}

const Roullete: React.FC<RoulleteProps> = ({
  item,
  getResult,
  staticItens = false,
  disabled = false,
}) => {
  const { activeWin, setRollingn, setRoulleteId } = useWin();
  let { authentication, setAuthentication } = useAuth();

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState<number>();
  const [quotasFormated, setQuotasFormated] = useState<any[] | undefined>([]);
  const [play, setPlay] = useState(false);
  const { notify } = useToast();

  const handleSpinClick = useCallback(async () => {
    setRollingn(true);

    try {
      if (
        !staticItens &&
        Number(authentication?.user.credits) <
          Number(item?.roullete?.price_roullete)
      ) {
        throw new Error("Você não possui creditos suficientes");
      }

      if (!disabled && !staticItens) {
        if (item) {
          const prizeNumberResult = Math.floor(
            Math.random() * item.data?.length
          );

          // const prizeNumberResult = 2;
          // const prizeNumber = radomResult(item.data,item?.roullete  as any)
          setPrizeNumber(prizeNumberResult);
          setMustSpin(true);
          setPlay(true);
          const resultQuotas = item?.data[prizeNumberResult];

          setTimeout(() => {
            api
              .patch("users/updateCredits", {
                userId: authentication?.user.id,
                resultQuotas: Number(resultQuotas?.valueQuota),
                price_roullete: Number(item?.roullete?.price_roullete),
              })
              .then((response) => {
                if (getResult) {
                  getResult(Number(resultQuotas?.valueQuota));
                }

                if (authentication) {
                  setAuthentication({
                    ...authentication,
                    user: {
                      ...authentication.user,
                      credits: response.data.credits,
                      house_profit: response.data.house_profit,
                      bonus: response.data.bonus,
                      profit: response.data.profit,
                      accumulated: response.data.accumulated,
                    },
                  });
                }

                const resultRodada =
                  (resultQuotas.valueQuota || 0) -
                  Number(item.roullete?.price_roullete);

                if (
                  (resultQuotas?.valueQuota || 0) >
                  Number(item?.roullete?.price_roullete)
                ) {
                  notify({
                    message: `Parabens 🎉🎉🎉, Você ganhou  
                  ${new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(resultRodada)} nessa rodada `,
                    types: "warning",
                  });
                }
              });
          }, 12000);
        }
      } else {
        const newPrizeNumber = Math.floor(Math.random() * staticData.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
        setPlay(true);
      }
    } catch (err: any) {
      notify({
        message: err.message,
        types: "warning",
      });
    }
  }, [
    authentication,
    disabled,
    getResult,
    item,
    notify,
    setAuthentication,
    setRollingn,
    staticItens,
  ]);

  useEffect(() => {
    setRoulleteId(item?.roullete?.id);
  }, [item?.roullete?.id, setRoulleteId]);

  useEffect(() => {}, []);

  useEffect(() => {
    const roulleteData = item?.data.map((quotas) => {
      if (quotas.valueQuota) {
        const mountObj = {
          option: quotas.valueQuota.toString(),
          style: { backgroundColor: quotas.color, textColor: "#fff" },
        };
        return mountObj;
      }
    });

    if (item) {
      setQuotasFormated(roulleteData);
    }
  }, [item, item?.data]);

  useEffect(() => {
    if (prizeNumber) {
      const timer = setTimeout(() => {
        activeWin(true);
      }, 11000);

      const timer2 = setTimeout(() => {
        activeWin(false);
        setPlay(false);
      }, 14000);
    }
  }, [activeWin, prizeNumber]);

  const formatCurrencyData = currencyFormat(quotasFormated || []);

  return (
    <>
      {/* {!play && (
        <audio style={{ display: "none" }} autoPlay src="/sounds/roullete.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      )} */}

      <Container>
        {/* <div onClick={activeSound}>
        {
          play ?
          <TbMusic cursor={'pointer'} className='relative ml-auto mr-10 -mb-10' size={40}/>
          :
          <TbMusicOff cursor={'pointer'} className='relative ml-auto mr-10 -mb-10' size={40}/>
        }

      </div> */}
        <RoulleteContainer>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber || 0}
            spinDuration={1}
            outerBorderColor="linear-gradient(0deg, rgba(229,189,49,1) 7%, rgba(242,222,56,1) 30%, rgba(254,255,63,1) 86%)"
            outerBorderWidth={0}
            fontSize={14}
            data={staticItens ? staticData : formatCurrencyData}
            onStopSpinning={() => {
              setMustSpin(false);
              setRollingn(false);
            }}
          />
          <Spin disabled={disabled} active={mustSpin} onClick={handleSpinClick}>
            <p>Girar</p>
          </Spin>

          <Arrow>
            <Image
              src="/images/seta-estrib.png"
              width={"80px"}
              height="80px"
              alt="seta"
            />
          </Arrow>
        </RoulleteContainer>
      </Container>
    </>
  );
};
export default Roullete;
