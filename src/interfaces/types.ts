import { Solicitation, User } from "@prisma/client";

export interface ISolicitation {
  id: string;
  value_solicitation: number;
  userId: string;
  status: "SOLICITADO" | "PAGO";
  createdAt: string;
}

export interface IUser {
  id: string;
  name: string;
  last_name: string;
  email: string;
  bank: string;
  pix: string;
  telephone: string;
  image?: string;
  isAdmin: boolean;
  house_profit: number;
  bonus: number;
  profit: number;
  credits: number;
  solicitations?: ISolicitation[];
}

export interface INotifications {
  createdAt: string;
  description: string;
  id: string;
  solicitation: Solicitation;
  user: User;
  visualized: boolean;
}

export interface StyleType {
  backgroundColor?: string;
  textColor?: string;
}

export interface WheelData {
  option?: string;
  style?: StyleType;
}
export interface IRoullete {
  nameCategory: string;
  id: string;
  status: string;
  price_roullete: number;
}

export interface IQuotas {
  color?: string | undefined;
  id?: string;
  roulleteId?: string;
  valueQuota?: number | undefined;
}

export interface IRoulleteQuota {
  nameCategory: string;
  id: string;
  status: string;
  price_roullete: number;
  quotas: IQuotas[];
}

export interface RoulleteQuotas {
  roullete?: IRoullete;
  data: IQuotas[];
}
