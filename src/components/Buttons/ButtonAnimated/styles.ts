import styled, { css } from 'styled-components'

interface ButtonProps{
  animation?:boolean
}

export const Container = styled.button<ButtonProps>`


  display: flex;
  align-items: center;
  justify-content: center;

  height: 60px;

  background: linear-gradient(90deg, #E5BD31 41.3%, #E8A700 61.27%);
  box-shadow: 0px 4px 4px rgba(229, 189, 49, 0.5);
  border-radius: 8px;
  cursor: pointer !important;

  font-weight: 800;
  
  letter-spacing : 3px;


  transition: all 200ms;

  svg{
    margin-right: 0;
  }

  ${ props => props.animation && 
    css`
      animation: pulse-button 0.4s   infinite;
      animation-direction: alternate;
      -webkit-animation-name: pulse-button;
      animation-name: pulse-button;
    `
  }

  &:hover{
    animation: pulse-button 0.4s   pause;
    filter: drop-shadow(0px 0px 10px rgba(229, 189, 49, 5));
    border: solid rgba(229, 189, 49) 5px;
  }


  @keyframes pulse-button {
  0% {
    box-shadow: 0px 0px 2px rgba(0,0,0,0.3);
    -webkit-transform: scale(1);
  }
  100% {
    box-shadow:0px 0px 10px rgba(229, 189, 49, 5) ;
    -webkit-transform: scale(1.03);
  }
}
  

`

