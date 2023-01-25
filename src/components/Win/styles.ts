import styled from "styled-components";

export const Container = styled.div`
  /* background-color: rgba(0,0,0,0.1); */
  width: 100%;
  height: calc(100vh- 90px);
  top: -20px;
  position: absolute;
  z-index: 999999999;
  box-shadow: inset 0 0 38px 20px gold;

  animation: pulse 0.7s infinite;
  animation-direction: alternate;
  -webkit-animation-name: pulse-win;
  animation-name: pulse-win;

  @keyframes pulse-win {
    0% {
      box-shadow: inset 0 0 38px 30px gold;
    }
    100% {
      box-shadow: inset 0 0 38px 20px gold;
    }
  }
`;
