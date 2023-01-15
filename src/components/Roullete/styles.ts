import styled from 'styled-components'

export const Container = styled.div`
width: 100%;
height: 100%;
position: relative;

`
export const RoulleteContainer = styled.div`

  position: relative;
  transform: rotate(45deg);
  right: 20%;

  @media(max-width:768px){
    transform: initial;
  }


&::after{
  background-size: contain;
  background: rgb(255,221,0);
  background: radial-gradient(circle, rgba(255,221,0,1) 65%, rgba(209,184,20,0.8522759445575105) 70%);
  background-size: cover;
  content: '';
  border-radius: 50%;
  width: 107%;
  height: 107%;
  top: -15px;
  right: -15px;
  position: absolute;
  display: inline-block;
  filter: drop-shadow(0px 0px 10px #D1B814);

  @media(max-width:768px){
    top: -6px;
    right: -42px;
    width: 105%;
    height: 104%;
  }
}

`

interface SpinProps{
  active:boolean
  disabled?:boolean
}


export const Spin = styled.div<SpinProps>`

display: flex;
align-items: center;
justify-content: center;

position:absolute;
width: 100px;
height: 100px;
border-radius: 50%;
position: absolute;
top: 40%;
left: 40%;
z-index: 30;
cursor: ${props => props.active || props.disabled ? 'not-allowed' : 'pointer'};
background: ${props => props.active || props.disabled  ? 'rgba(189, 188, 187)' : 'linear-gradient(90deg, #E5BD31 41.3%, #E8A700 61.27%)'};
animation: pulse 0.7s  ${props => props.active ? 'both' : 'infinite'};
animation-direction: alternate;
-webkit-animation-name: pulse;
animation-name: pulse;

@media(max-width:768px){
  width:80px;
  height:80px;
  top: 36%;
  left: 48%;
}

p{
  transform: rotate(-45deg);

  @media(max-width:768px){
  transform: rotate(0deg);

}
}

@keyframes pulse {
  0% {
    filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.6));
    -webkit-transform: scale(1);
  }
  100% {
    filter: drop-shadow(0px 0px 10px rgba(0,0,0,1));
    -webkit-transform: scale(1.05);
  }
}

`

export const Arrow = styled.div`
  transform: rotate(135deg);
  z-index: 9;
  position: absolute;
  right: 30px;
  top: 20px;
  filter: drop-shadow(5px 5px 10px #E5BD31);

  @media(max-width:768px){
    right: -20px;
    top: 25px;

    width: 55px;
    height: 55px;
  }

  `

