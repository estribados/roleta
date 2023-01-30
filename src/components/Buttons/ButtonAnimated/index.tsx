import React, { ButtonHTMLAttributes } from "react";
import Ripples from "react-ripples";
import { Container, ContainerAnimated } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  animation?: boolean;
  textSize?: string;
  children?: JSX.Element | string | JSX.Element[];
}

const ButtonAnimated: React.FC<ButtonProps> = ({
  animation,
  textSize,
  children,
  ...rest
}) => {
  return (
    <ContainerAnimated animation={animation}>
      <Container
        className="  flex items-center justify-center w-full h-full  text-white"
        {...rest}
      >
        {children}
      </Container>
    </ContainerAnimated>
  );
};
export { ButtonAnimated };
