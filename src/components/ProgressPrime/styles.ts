import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  max-width: 980px;
  margin: 10px auto 0 auto;
  gap: 10px;

  .win {
    width: 50px;
    height: 50px;
    img {
      animation: pulse-win 0.4s infinite;
      animation-direction: alternate;
      -webkit-animation-name: pulse-win;
      animation-name: pulse-win;
    }
  }

  @keyframes pulse-win {
    0% {
      -webkit-transform: scale(1);
    }
    100% {
      /* box-shadow: 0px 0px 10px rgba(229, 189, 49, 5); */
      filter: drop-shadow(5px 5px 10px rgba(229, 189, 49, 5));
      -webkit-transform: scale(1.03);
    }
  }
`;

export const RoulleteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 445px;
  max-height: 445px;
  margin: auto;

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

  filter: drop-shadow(0px 0px 10px #d1b814);
`;

interface SpinProps {
  active: boolean;
  disabled?: boolean;
}

export const Spin = styled.div<SpinProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: absolute;
  top: 40%;
  left: 40%;
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
    top: 36%;
    left: 36%;
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
  right: 30px;
  top: 20px;
  filter: drop-shadow(5px 5px 10px #e5bd31);

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
  }
`;
