import styled from 'styled-components'

export const Container = styled.div`
min-height: calc(100vh - 108px);
display: grid;
width: 100%;
grid-template-columns: 1fr 1fr;

@media(max-width:768px){
}


.invisibleButton{
  @media(max-width:768px){
    display: none;
  }

}

.visibleButton{
    margin-top: 60px;
    display: none;

    @media(max-width:768px){
      display: block;
    }
  }

@media(max-width:768px){
  grid-template-columns: 1fr;
}


align-items:center;
padding: 64px 10px;

section{
  display: flex;
  flex-direction: column;
  height: 100%;

  h1{
    font-weight: 800;
    font-size: 30px;
    line-height: 40px;

    @media(max-width:768px){
      text-align: center;
      font-size:24px;
    }
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

    .img{

      @media(max-width:768px){
        height: 100px !important;
      }
    }

    p{
      font-size: 20px;

      @media(max-width:768px){
        font-size:16px;
      }
      span{
        font-weight: bold;

        @media(max-width:768px){
          font-size:20px;

      }
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