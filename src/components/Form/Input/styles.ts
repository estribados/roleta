import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 6px;
  width: 100%;
  border: 4px solid #fff;
  color: #c3c3c3;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #ffd700;
  border: 4px solid #ffd700;

    `}
  ${props =>
    props.isField &&
    css`
      color: #ffd700;
    `}
  input{
    flex: 1;
    background: #fff !important;
    display: flex;
    color: #c3c3c3;
    width:100%;
    border:none !important;
    outline:none

    }
   
    svg{
      margin-right: 16px;
    }
  svg {
    margin-right: 16px;
  }
  
`;

export const Error = styled.div`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #f4ede8;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;