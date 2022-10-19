import styled from 'styled-components'

export const Container = styled.div`
width: 100%;
height: 100%;
position: relative;
`
export const RoulleteContainer = styled.div`

  position: fixed;
  transform: rotate(-130deg);
  right: 10%;


&::after{
  background-image: url('images/bgRoletatextura.jpg');
  background-size: contain;
  content: '';
  border-radius: 50%;
  width: 105%;
  height: 105%;
  top: -10px;
  right: -12px;
  position: absolute;
  display: inline-block;
  filter: drop-shadow(0px 0px 10px #D1B814);

}

`

interface SpinProps{
  active:boolean
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
z-index: 50;
cursor: ${props => props.active ? 'not-allowed' : 'pointer'};
background: ${props => props.active ? 'rgba(189, 188, 187)' : 'linear-gradient(90deg, #E5BD31 41.3%, #E8A700 61.27%)'};
animation: pulse 0.7s  ${props => props.active ? 'both' : 'infinite'};
animation-direction: alternate;
-webkit-animation-name: pulse;
animation-name: pulse;

p{
  transform: rotate(130deg);

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
  transform: rotate(130deg);
  z-index: 999;
  position: absolute;
  right: 30px;
  top: 30px;
  filter: drop-shadow(5px 5px 10px #E5BD31);
  `

