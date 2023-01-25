import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Container } from "./styles";
import Image from "next/image";
import { IoIosInformationCircleOutline } from "react-icons/io";
import ModalRoullete from "./modalRoullete";

interface ThermometherProps {
  bonus: number;
  maxValue: number;
}

const Thermometer: React.FC<ThermometherProps> = ({ bonus, maxValue }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const percentageCacl = (Number(bonus) * 100) / Number(maxValue);

    if (percentageCacl >= 100) {
      setPercentage(100);
    } else {
      setPercentage(Number(percentageCacl.toFixed(2)));
    }
  }, [bonus, maxValue, percentage]);

  return (
    <>
      <Container>
        <div className="flex items-center gap-3 -mb-4">
          <strong className="text-bold">Rodada bonus</strong>
          <div
            className="tooltip tooltip-bottom z-50"
            data-tip="Quando sua barra de progresso estiver em 100%, você tera direito a uma rodada bonus"
          >
            <IoIosInformationCircleOutline color="#ffff" />
          </div>
        </div>

        <div className=" h-16 w-full items-center flex flex-1">
          <ProgressBar
            maxCompleted={100}
            completed={Number(percentage.toFixed(2))}
            className="flex-1"
            bgColor="gold"
            labelColor="black"
          />

          {percentage >= 100 ? (
            <label htmlFor="my-modal-4" className="win">
              <Image
                className="ml-5 cursor-pointer"
                src={"/images/money-bag.png"}
                alt="Picture of the author"
                width="46px"
                height="46px"
              />
            </label>
          ) : (
            <Image
              className="ml-5 cursor-pointer"
              src={"/images/treasure.png"}
              alt="Picture of the author"
              width="46px"
              height="46px"
            />
          )}
        </div>

        <ModalRoullete bonus={bonus} />
      </Container>
    </>
  );
};
export default Thermometer;
