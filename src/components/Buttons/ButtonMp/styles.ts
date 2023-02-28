import styled, { css } from "styled-components";

interface ButtonProps {
  animation?: boolean;
}

export const ContainerAnimated = styled.div<ButtonProps>`
  margin: 0 auto;
  background: linear-gradient(90deg, yellow 41.3%, yellow 61.27%);
  box-shadow: 0px 4px 4px rgba(229, 189, 49, 0.5);
  border-radius: 8px;
  min-height: 70px;
  font-weight: 800;
  letter-spacing: 3px;
  transition: all 200ms;
  cursor: pointer !important;
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    animation: pulse-button 0.4s pause;
    filter: drop-shadow(0px 0px 10px rgba(229, 189, 49, 5));
    border: solid rgba(229, 189, 49) 5px;
  }

  ${(props) =>
    props.animation &&
    css`
      animation: pulse-button 0.4s infinite;
      animation-direction: alternate;
      -webkit-animation-name: pulse-button;
      animation-name: pulse-button;
    `}

  @keyframes pulse-button {
    0% {
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
      -webkit-transform: scale(1);
    }
    100% {
      box-shadow: 0px 0px 10px rgba(229, 189, 49, 5);
      -webkit-transform: scale(1.03);
    }
  }
`;

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  /* -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: #8adaff;
  -webkit-text-fill-color: #8adaff; */
  color: #1e82d9;

  font-size: 36px;
  height: 100%;

  svg {
    margin-right: 0;
  }
`;

export const QrCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #000000;
`;
