import axios from 'axios';

const apiMp = axios.create({
  baseURL: 'https://api.mercadopago.com/'
})


export default apiMp