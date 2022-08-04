export interface IAPI {
  restAPI: string
  postalCodeAPI: string
}
export const api: IAPI = {
  restAPI: 'http://localhost:5000/api',
  postalCodeAPI: 'https://api.zippopotam.us',
}

export const json = {
  countriesJSON: 'http://localhost:3000/assets/json/countries.json',
}

// 75903-440
