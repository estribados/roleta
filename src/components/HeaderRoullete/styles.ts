import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 40px  auto 0 auto;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  nav{
  padding: 5px 25px;
  margin: 0 20px ;
  border-radius: 20px;
  background: linear-gradient(90deg, #E5BD31 41.3%, #E8A700 61.27%);
  display: flex;
  gap: 10px;
  overflow: auto;
  justify-content: space-between;

    li{
      cursor:pointer;
      /* min-width:100px; */
      display: flex;
      flex-direction: column;
      list-style: none;
      font-weight: bold;
      font-size: 24px;
      padding: 0px 8px;
      border-radius: 8px;
      transition: all 200ms;

      span{
        font-weight: 400;
        font-size: 12px;
        color: #777373;
      }

      &:hover{
        background-color: gold;
      }
    }
  }
`