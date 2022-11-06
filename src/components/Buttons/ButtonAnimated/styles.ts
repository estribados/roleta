import styled from 'styled-components'

export const Container = styled.button`

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 60px;

  background: linear-gradient(90deg, #E5BD31 41.3%, #E8A700 61.27%);
  box-shadow: 0px 4px 4px rgba(229, 189, 49, 0.5);
  border-radius: 8px;
  cursor: pointer !important;
  animation: pulse-button 0.4s   infinite;
  animation-direction: alternate;
  -webkit-animation-name: pulse-button;
  animation-name: pulse-button;
  font-weight: 800;
  font-size: 24px;
  
  letter-spacing : 3px;

  &:hover{
  animation: pulse-button 0.4s   none;

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

