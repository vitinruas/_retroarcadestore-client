import { IAvaliation } from './avaliation-entitie'

type ICategory = 'games' | 'clothes' | 'accessories'

export interface IProduct {
  id: string
  category: ICategory
  name: string
  mainImage: string
  previewImages: string[]
  description: string
  avaliations: IAvaliation[]
  quantity: number | 'isGame'
  price: number
  discount: number
  isEnabled: boolean
  createdAt: string
  updatedAt?: string
}
