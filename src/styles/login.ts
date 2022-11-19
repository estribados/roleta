import { shade } from 'polished'
import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  overflow: hidden;



  .socialButtons{
    >div{
      display: flex;

      svg{
        margin-right: 8px;
      }
    }
  }



`

const appearFromLeft = keyframes `
  from{
    opacity: 0;
    transform: translateX(50px);
  overflow: hidden;

  }
  top{
    opacity: 1;
    transform: translateX(0);
  overflow: hidden;

  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation:${appearFromLeft} 1s;
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
  max-width: 500px;

  @media(max-width:720px){
    padding:0 20px ;
  }

.line{

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  flex-basis: 0;
  margin-top: 20px;
  


  &::before{
  content:"";
  text-align: center;
  box-shadow: 0px -2px 10px rgba(98, 73, 138, 0.2);
  height:1px;
  border-radius: 20px;
  background: #E5BD31;
  border: 3px solid #E5BD31;
  width:100%;
  color:#FFF;
  margin-right: 10px;

}


&::after{
  content:"";
  text-align: center;
  box-shadow: 0px -2px 10px rgba(98, 73, 138, 0.2);
  height:1px;
  border-radius: 20px;
  border: 3px solid #E5BD31;
  background: #E5BD31;
  width:100%;
  color:#FFF;
  margin-left: 10px;
}
}

  
form{
    margin: 30px 0;
    text-align:center;
    h1{
      margin-bottom: 24px;
    }
    a{
      margin-left: 5px;
      
        &:hover{
          color:${shade(0.2,'#f4ede8')} !important;
        }
    }


    label{
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      
    }

    label+label{
        margin-top: 15px;
      }
    
  }

`


export const Background = styled.div`
  flex: 1;

  background-size:80%;
  position: relative;

`

export const ContainerBg = styled.div`

`


