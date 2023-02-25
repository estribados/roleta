import { useAuth } from "hooks/useAuth";
import { useToast } from "hooks/useToast";
import { RoulleteQuotas } from "interfaces/types";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import api from "services/api";
import { currencyFormat } from "utils/currencyNumber";
import { Arrow, Container, RoulleteContainer, Spin } from "./styles";

interface RoulleteProps {
  item?: RoulleteQuotas | undefined;
  getResult?(value: number): void;
  setHandleModal(value: boolean): void;
}

const Roullete: React.FC<RoulleteProps> = ({ item, setHandleModal }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState<number>();
  const [quotasFormated, setQuotasFormated] = useState<any[] | undefined>([]);
  const [play, setPlay] = useState(false);
  const { notify } = useToast();
  const { authentication, setAuthentication } = useAuth();

  const handleSpinClick = useCallback(async () => {
    try {
      if (item) {
        const newPrizeNumber = Math.floor(Math.random() * item?.data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
        setPlay(true);

        const valueQuota = Number(item?.data[newPrizeNumber].valueQuota);
        setTimeout(async () => {
          const { data } = await api.patch("users/updateCredits", {
            userId: authentication?.user.id,
            resultQuotas: Number(valueQuota),
            price_roullete: Number(item?.roullete?.price_roullete),
            roulleteBonus: true,
          });

          // const { data } = await api.put("users/updateBonus", {
          //   result: valueQuota,
          //   userId: authentication?.user.id,
          // });
          if (authentication) {
            setAuthentication({
              ...authentication,
              user: {
                ...authentication.user,
                house_profit: data.house_profit,
                credits: data.credits,
                bonus: data.bonus,
                user_profit: data.profit,
                accumulated: data.accumulated,
              },
            });
          }

          setHandleModal(false);

          notify({
            message: `Parabens você ganhou ${new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(valueQuota)}`,
            types: "success",
          });
        }, 12000);
      }
    } catch (err: any) {
      notify({
        message: err.message,
        types: "warning",
      });
    }
  }, [authentication, item, notify, setAuthentication, setHandleModal]);

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

  const formatCurrencyData = currencyFormat(quotasFormated || []);

  return (
    <>
      {play && (
        <audio style={{ display: "none" }} autoPlay src="/sounds/roullete.mp3">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      )}

      <Container>
        <RoulleteContainer>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber || 0}
            spinDuration={1}
            outerBorderColor="linear-gradient(0deg, rgba(229,189,49,1) 7%, rgba(242,222,56,1) 30%, rgba(254,255,63,1) 86%)"
            outerBorderWidth={0}
            fontSize={14}
            data={formatCurrencyData}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
          />
          <Spin active={mustSpin} onClick={handleSpinClick}>
            Girar
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
