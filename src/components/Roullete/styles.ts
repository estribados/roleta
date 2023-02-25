import styled from "styled-components";

export const Container = styled.div`
  /* height: 100%; */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const RoulleteContainer = styled.div`
  /* position: relative; */
  /* width: 100%;
  height: 100%;
  max-width: 450px; */

  /* transform: rotate(45deg); */
  /* right: 20%; */
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 445px;
  max-height: 445px;

  min-width: 330px;
  min-height: 330px;
  margin: auto;

  /* &::after{ */

  background-size: contain;
  background: rgb(255, 221, 0);
  background: radial-gradient(
    circle,
    rgba(255, 221, 0, 1) 65%,
    rgba(209, 184, 20, 0.8522759445575105) 70%
  );
  background-size: cover;
  content: "";
  border-radius: 50%;
  /* width: 107%;
  height: 107%; */

  filter: drop-shadow(0px 0px 10px #d1b814);

  @media (max-width: 768px) {
  }
  /* } */
`;

interface SpinProps {
  active: boolean;
  disabled?: boolean;
}

export const Spin = styled.div<SpinProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 100px;
  border-radius: 50%;

  z-index: 30;
  cursor: ${(props) =>
    props.active || props.disabled ? "not-allowed" : "pointer"};
  background: ${(props) =>
    props.active || props.disabled
      ? "rgba(189, 188, 187)"
      : "linear-gradient(90deg, #E5BD31 41.3%, #E8A700 61.27%)"};
  animation: pulse 0.7s ${(props) => (props.active ? "both" : "infinite")};
  animation-direction: alternate;
  -webkit-animation-name: pulse;
  animation-name: pulse;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }

  p {
    @media (max-width: 768px) {
    }
  }

  @keyframes pulse {
    0% {
      filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.6));
      -webkit-transform: scale(1);
    }
    100% {
      filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 1));
      -webkit-transform: scale(1.05);
    }
  }
`;

export const Arrow = styled.div`
  transform: rotate(135deg);
  z-index: 9;
  position: absolute;
  right: 15px;
  top: 18px;
  filter: drop-shadow(5px 5px 10px #e5bd31);

  @media (max-width: 768px) {
    right: 10px;
    top: 20px;
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
  }
`;
