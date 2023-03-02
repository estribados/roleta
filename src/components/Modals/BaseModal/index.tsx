import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

import * as S from "../BaseModal/styles";

type ModalProps = {
  isVisible: boolean;
  title: string;
  onCloseModal: any;
  children?: React.ReactNode;
};

export function BaseModal({
  isVisible = false,
  title,
  onCloseModal,
  children,
}: ModalProps) {
  return (
    <>
      {isVisible && (
        <S.ContainerOverlay
          isVisible={isVisible}
          id={"overlay"}
          onClick={() => onCloseModal()}
        ></S.ContainerOverlay>
      )}

      {isVisible && (
        <S.BoxModal>
          <S.Header>
            <S.Title>{title}</S.Title>

            <button type="button" onClick={() => onCloseModal()}>
              <MdClose size={14} />
            </button>
          </S.Header>

          {children}
        </S.BoxModal>
      )}
    </>
  );
}
