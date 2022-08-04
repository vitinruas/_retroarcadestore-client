import React, { createContext, ReactElement, useContext, useState } from 'react'

interface IUsePriceConverter {
  convert(price: number, cipher: string): string
}

export const usePriceConverter = (): IUsePriceConverter => {
  const convert = (price: number, cipher: string): string => {
    return `${cipher}: ${price.toFixed(2).replace('.', ',')}`
  }
  return { convert }
}
