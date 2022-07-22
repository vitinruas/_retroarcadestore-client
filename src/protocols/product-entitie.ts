import { IAvaliation } from './avaliation-entitie'

export interface IProduct {
  id: string
  category: 'games' | 'clothes' | 'accessories'
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
