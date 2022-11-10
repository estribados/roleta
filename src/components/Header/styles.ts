import styled from 'styled-components'

export const Container = styled.div`
form{
  display: flex;
  flex-direction: column;


  h4{
    position: relative;
    color: red;
  }

  h4::before{
    content: "ee";
    position: absolute;
    width: 100%;
    max-width: 120px;
    height: 20px;
    background-color: red;
  }
}
`

export const Label = styled.label`
width: 100%;
`

export const ContainerLabel = styled.div`
display: flex;
align-items: center;
gap: 20px;


@media(max-width:720px){
  flex-direction: column;
}

`