import React, { useState } from "react";

import dynamic from "next/dynamic";

import { BaseModal } from "components/Modals/BaseModal";

const DynamicComponentWithNoSSR = dynamic(() => import("./roulleteBonus"), {
  ssr: false,
});

interface MaxRoullete {
  bonus: number;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalRoullete: React.FC<MaxRoullete> = ({
  bonus,
  openModal,
  setOpenModal,
}) => {
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

  return (
    <BaseModal
      isVisible={openModal}
      title={"Parabéns, resgate agora seu premio."}
      onCloseModal={setOpenModal}
    >
      <section className="py-4">
        <DynamicComponentWithNoSSR
          setHandleModal={setHandleModal}
          item={{
            data: obj,
          }}
        />
      </section>
    </BaseModal>
  );
};
export default ModalRoullete;
