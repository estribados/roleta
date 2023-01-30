import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  align-items: center;

  @media (max-width: 720px) {
    height: initial;
  }

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
  margin: 20px auto;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-height: 916px) {
    .responsive-container {
      bottom: 15px !important;
    }
  }

  @media (max-width: 912px) {
    flex-direction: column;
  }

  @media (max-height: 740px) {
    .responsive-container {
      bottom: 59px;
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;

    padding: 0 20px;
    margin: 20px auto;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-weight: 600;
      font-size: 46px;
      line-height: 66px;
      text-align: center;
      color: yellow;

      a {
        font-size: 66px;
        font-weight: 800;
      }

      @media (max-width: 720px) {
        text-align: center;
        font-size: 30px;

        line-height: 44px;

        a {
          font-size: 44px;
        }
      }

      @media (max-width: 420px) {
        font-size: 26px;

        span {
          font-size: 36px;
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
