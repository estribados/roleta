import styled from "styled-components";

export const Container = styled.div`
  /* background-image: url('images/caverna-home.webp');
background-repeat:no-repeat;
background-size:cover;
background-position:  70%;
position:absolute;
width:100vw;
left:0;
align-items:center; */
  height: 80vh;
  aside {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  @media (max-width: 720px) {
    background-position: 30%;
  }
`;

export const Content = styled.main`
  max-width: 1024px;
  margin: 50px auto;

  display: grid;
  grid-template-columns: 1fr 1fr;

  height: calc(100vh - 253px);
  position: relative;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
    height: calc(100vh - 139px);

    .containerRoullete {
      order: 1;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    h1 {
      font-weight: 600;
      font-size: 46px;
      line-height: 66px;
      text-align: center;
      background: -webkit-linear-gradient(yellow, yellow);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      a {
        font-size: 66px;
        font-weight: 800;
      }

      @media (max-width: 720px) {
        text-align: center;
        font-size: 34px;
        line-height: 44px;

        a {
          font-size: 44px;
        }
      }
    }
  }
`;

export const ContainerImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .animation {
    position: absolute;
    bottom: 60px;
    right: 0;
    z-index: 1;
  }

  > div {
    display: flex;
    margin-top: 50px;

    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .img {
        @media (max-width: 768px) {
          height: 100px !important;
        }
      }

      p {
        font-size: 20px;

        @media (max-width: 768px) {
          font-size: 16px;
        }
        span {
          font-weight: bold;

          @media (max-width: 768px) {
            font-size: 20px;
          }
        }
      }

      p:nth-child(1) {
        margin-left: 10px;
        margin-top: -20px;
      }

      p:nth-child(2) {
        margin-left: 10px;
        margin-bottom: -20px;
      }
    }
  }

  /* background-size:450px 300px */
`;
