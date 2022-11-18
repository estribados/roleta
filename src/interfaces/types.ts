export interface ISolicitation{
  id:string
  value_solicitation:number
  userId:string
  status: 'SOLICITADO' | 'PAGO'
  createdAt:string
  }


export interface IUser{
  id:string
  name:string
  last_name:string
  email:string
  bank:string
  pix:string
  telephone:string
  image?:string
  isAdmin:boolean
  credits:number
  solicitations?:ISolicitation[]
}


