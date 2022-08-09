export type StarsType = 1 | 2 | 3 | 4 | 5

export interface IAvaliation {
  id: string
  idUser: string
  photo: string
  comment: string
  stars: StarsType
}
