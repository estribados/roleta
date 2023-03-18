import styled, { css } from "styled-components";

interface ContainerProps {
  toggle: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 1024px;
  margin: 40px auto 0 auto;
  box-shadow: 0 10px 15px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 740px) {
    ${({ toggle }) =>
      toggle &&
      css`
        display: block;
        padding: 10px 0;
        z-index: 49;
        top: 50px;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
      `}
  }

  @media (min-width: 739px) or (min-height: 740px) {
    display: block;
  }

  nav {
    padding: 5px 25px;
    margin: 0 20px;
    border-radius: 20px;
    background: linear-gradient(90deg, yellow 41.3%, yellow 61.27%);
    display: flex;
    gap: 10px;
    overflow: auto;
    justify-content: space-around;
    color: #1e82d9;

    @media (max-width: 350px) {
      justify-content: initial;
    }

    &::-webkit-scrollbar-track {
      background-color: #f4f4f4;
      border-radius: 30px;
    }
    &::-webkit-scrollbar {
      display: none;
      height: 5px;
      border-radius: 30px;
      background: #000000;
    }
    &::-webkit-scrollbar-thumb {
      background: yellow;
      border-radius: 30px;
    }

    a {
      cursor: pointer;
      /* min-width:100px; */
      display: flex;
      flex-direction: column;
      list-style: none;
      font-weight: bold;
      font-size: 24px;
      padding: 0px 8px;
      border-radius: 8px;
      transition: all 200ms;

      @media (max-width: 720px) {
        font-size: 14px;
      }

      span {
        font-weight: 400;
        font-size: 12px;
        color: #1e82d9;
      }

      &:hover {
        background-color: gold;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
    }

    .activeNavLink {
      background-color: gold;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const ToogleMenu = styled.label``;
