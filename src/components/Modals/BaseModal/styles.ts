import styled, { css, keyframes } from "styled-components";
import { lighten, shade } from "polished";
import media from "styled-media-query";

type ModalProps = {
  isVisible: boolean;
};

const ModalScale = keyframes`
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
`;

export const ContainerOverlay = styled.aside<ModalProps>`
  ${({ theme, isVisible }) => css`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;

    display: ${isVisible ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `}
`;

export const BoxModal = styled.div`
  ${({ theme }) => css`
    max-width: 693px;
    width: 90%;

    border-radius: 10px;
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ${media.greaterThan("small")`
      max-height: 737px;
    `}

    ${media.lessThan("small")`
    `}

    background-color: #2a303c;
    animation: ${ModalScale} 0.3s ease-in-out;
  `}
`;

export const Header = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.2rem;
    padding-bottom: 0rem;

    & > button {
      padding: 2px;
      width: 35px;
      height: 35px;
      border-radius: 8px;

      background: gold;

      display: flex;
      justify-content: center;
      align-items: center;
      transition: background 0.2s;
      width: 35px;
      height: 35px;

      svg {
        color: white;
      }

      &:hover {
        background: ${({ theme }) => lighten(0.1, "white")};
      }
    }
  `}
`;

export const Title = styled.h4`
  ${({ theme }) => css`
    color: white;
    text-align: center !important;
  `}
`;

export const Description = styled.p`
  ${({ theme }) => css`
    color: white;
    margin: 0 8px;
    text-align: center;
  `}
`;
