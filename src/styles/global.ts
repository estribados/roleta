import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

`;

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;

  .whatsapp-link {
    position: absolute;
    right: 0;
  }

  @media (max-width: 720px) {
    padding: 0 20px;
  }

  select {
    color: gray;
  }

  .table th:first-child {
    position: initial !important;
  }
`;
