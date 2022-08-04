import React, { createContext, ReactElement, useContext, useState } from 'react'

interface IUseMoneyConverter {
  convert(price: number, cipher: string): string
}

export const useMoneyConverter = (): IUseMoneyConverter => {
  const convert = (price: number, cipher: string): string => {
    return `${cipher}: ${price.toFixed(2).replace('.', ',')}`
  }
  return { convert }
}
