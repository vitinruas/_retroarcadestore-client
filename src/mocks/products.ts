import { IProduct } from '../protocols/product-entitie'

const products_list: IProduct[] = [
  {
    id: '1',
    name: 'Stay Out of the House',
    category: 'games',
    mainImage:
      'https://cdn.cloudflare.steamstatic.com/steam/apps/896520/capsule_616x353.jpg?t=1651856043',
    previewImages: [],
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, excepturi doloribus, cupiditate sapiente nostrum odio commodi est dignissimos minima tempore vitae unde error cumque enim magnam suscipit a illum saepe.',
    avaliations: [
      {
        id: '1',
        idUser: '456',
        comment: 'O produto é legal',
        photo: '',
        stars: 3,
      },
      {
        id: '1',
        idUser: '673',
        comment: 'Gostei muito, recomendo',
        photo: '',
        stars: 5,
      },
      {
        id: '1',
        idUser: '234',
        comment: 'Parabéns pra Retro Arcade',
        photo: '',
        stars: 5,
      },
    ],
    quantity: 'isGame',
    price: 59.99,
    discount: 10,
    isEnabled: true,
    createdAt: '21/07/22 07:54',
  },
  {
    id: '2',
    name: 'Stay Out of the House Shirt',
    category: 'clothes',
    mainImage: '',
    previewImages: [],
    description:
      'LOREM IPSUM DOLOR, SIT AMET CONSECTETUR ADIPISICING ELIT. SEQUI, EXCEPTURI DOLORIBUS, CUPIDITATE SAPIENTE NOSTRUM ODIO COMMODI EST DIGNISSIMOS MINIMA TEMPORE VITAE UNDE ERROR CUMQUE ENIM MAGNAM SUSCIPIT A ILLUM SAEPE.',
    avaliations: [
      {
        id: '1',
        idUser: '456',
        comment: 'A minha veio manchada',
        photo: '',
        stars: 1,
      },
      {
        id: '1',
        idUser: '673',
        comment: 'Gostei muito',
        photo: '',
        stars: 5,
      },
      {
        id: '1',
        idUser: '234',
        comment: 'A camisa é linda!',
        photo: '',
        stars: 3,
      },
    ],
    quantity: 3,
    price: 20.99,
    discount: 10,
    isEnabled: true,
    createdAt: '21/07/22 07:54',
  },
]

export default products_list
