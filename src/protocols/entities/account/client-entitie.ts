import { IAccountEntitie } from './account-entitie'

export interface IAddress {
  aid?: string
  uid?: string
  street?: string
  zipCode?: string
  district?: string
  state?: string
  city?: string
  country?: string
  updatedAt?: string
}

export interface IClientEntitie extends IAccountEntitie {
  photo?: string
  birthDay?: string
  address?: IAddress
}
