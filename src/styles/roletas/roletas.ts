import styled from 'styled-components'

export const Container = styled.div`
width: 100%;
max-width: 1024px;
margin: 0 auto;
display: flex;
align-items: center;
justify-content: center;
margin-top: 20px;
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