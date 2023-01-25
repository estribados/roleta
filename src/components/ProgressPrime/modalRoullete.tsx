import React, { useState } from "react";

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("./roulleteBonus"), {
  ssr: false,
});

interface MaxRoullete {
  bonus: number;
}

const ModalRoullete: React.FC<MaxRoullete> = ({ bonus }) => {
  const [handleModal, setHandleModal] = useState(false);
  function desconto(porcent: number) {
    const desconto = bonus - bonus * (porcent / 100);
    return Number(desconto.toFixed(2));
  }
  const obj = [
    {
      color: "gold",
      id: "1",
      roulleteId: "1",
      valueQuota: desconto(0),
    },

    {
      color: "blue",
      id: "1",
      roulleteId: "1",
      valueQuota: desconto(50),
    },

    {
      color: "red",
      id: "1",
      roulleteId: "1",
      valueQuota: desconto(60),
    },

    {
      color: "green",
      id: "1",
      roulleteId: "1",
      valueQuota: desconto(70),
    },
  ];

  //preciso de um endpoint que pegue o usuario logado,
  //subtraia de house-profitz o valor que ele ganhou nessa roleta

  return (
    <>
      <input
        checked={handleModal}
        onChange={(e) => {
          setHandleModal(e.target.checked);
        }}
        type="checkbox"
        id="my-modal-4"
        className="modal-toggle"
      />
      <label htmlFor="my-modal-4" className="modal cursor-pointer ">
        <label className="modal-box relative overflow-hidden" htmlFor="">
          <h3 className="text-lg text-center font-bold">
            Parabéns, resgate agora seu premio.
          </h3>
          <p className="py-4">
            <DynamicComponentWithNoSSR
              setHandleModal={setHandleModal}
              item={{
                data: obj,
              }}
            />
          </p>
        </label>
      </label>
    </>
  );
};
export default ModalRoullete;
