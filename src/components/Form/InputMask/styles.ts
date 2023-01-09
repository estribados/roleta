import styled, { css, DefaultTheme } from "styled-components";
import InputMask from "react-input-mask";
import { lighten } from "polished";

type LabelProps = {
  fontSize?: number;
};
interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isReadOnly: boolean;
}

export const Label = styled.p<LabelProps>`
  ${({ theme, fontSize }) => css`
    color: black;
    text-align: left;
    font-size: ${fontSize}px;
    margin-bottom: 5px;
  `}
`;

const containerModifiers = {
  isErrored: (theme: DefaultTheme) => css`
    border-color: 'red';
    padding-left: 28px;
  `,

  isFocused: (theme: DefaultTheme) => css`
    border-color: 'green';
  `,
};

export const Container = styled.div<ContainerProps>`
  ${({ theme, isErrored, isFocused, isReadOnly }) => css`




    input {
      width: 100%;  
      height: 100%;
      background-color: transparent;
      
      border: 0;
      outline: none;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 24px ${lighten(0.05, 'black')}
          inset;
        -webkit-text-fill-color: 'white';

        filter: none;
      }

      &:read-only {
        opacity: 0.7;
      }
      
      &:disabled {
        cursor: not-allowed;
      }
    }

    input[type='number'] {
      -moz-appearance:textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(0.7);
      position: absolute;
      right: 3%;
    }

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
      -webkit-appearance:none;
    }

    svg {
      margin-right: 16px;
    }
  `}
`;

export const MaskInput = styled(InputMask)`
  ${({ theme }) => css`
    input {
      width: 100%;
      height: 100%;

      background-color: transparent;
     
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 24px ${lighten(0.05, 'black')}
          inset;
        -webkit-text-fill-color: 'white';

        filter: none;
      }
    }
  `}
`;

export const ButtonIcon = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: 18px;
    top: 30%;
    cursor: pointer;

    & > img {
      width: 20px;
      height: 20px;
    }

    span {
      background: black;
      color: white;
      text-align: center;

      &::before {
        border-color: black transparent;
      }
    }
  `}
`;

export const Error = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 14px;
    left: 4px;

    height: 20px;
    margin-left: 12px;

    svg {
      margin: 0;
    }
    span {
      background: 'black';
      color: white;
      &::before {
        border-color: red transparent;
      }
    }
  `}
`;
