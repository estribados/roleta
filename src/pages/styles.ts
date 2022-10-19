import styled from 'styled-components'

export const Container = styled.div`
min-height: calc(100vh - 108px);
display: grid;
width: 100%;
grid-template-columns: 1fr 1fr;


align-items:center;
padding: 64px 0;

section{
  display: flex;
  flex-direction: column;
  height: 100%;

  h1{
    font-weight: 800;
    font-size: 30px;
    line-height: 40px;
  }
}

aside{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

@media(max-width:768px){
  min-height: calc(100vh - 60px);
}

`

export const ContainerImage = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 100%;

.animation{
  position:absolute;
  bottom: 60px;
  right: 0;
  z-index: 1;
}

  >div {
    display: flex;
    margin-top: 50px;

   >div{
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    p{
      font-size: 20px;
      span{
        font-weight: bold;
      }
    }

    p:nth-child(1){
      margin-left: 10px;
      margin-top: -20px;
    }

    p:nth-child(2){
      margin-left: 10px;
      margin-bottom: -20px;
    }
  }
}

  /* background-size:450px 300px */
`