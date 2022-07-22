import { StarsType } from './stars-entitie'

export interface IAvaliation {
  id: string
  idUser: string
  photo: string
  comment: string
  stars: StarsType
}
