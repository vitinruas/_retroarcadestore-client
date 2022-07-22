import React, { createContext, ReactElement, useContext } from 'react'

interface IPriceConverter {
  convert(price: number, cipher: string): string
}

const initialValue: IPriceConverter = {
  convert(price: number, cipher: string): string {
    return `${cipher}: ${price.toFixed(2).replace('.', ',')}`
  },
}

export const PriceConverterContext =
  createContext<IPriceConverter>(initialValue)

interface IProps {
  children: ReactElement
}

export const PriceConverterProvider = ({ children }: IProps) => {
  return (
    <PriceConverterContext.Provider value={initialValue}>
      {children}
    </PriceConverterContext.Provider>
  )
}

export const usePriceConverterContext = (): IPriceConverter =>
  useContext(PriceConverterContext)
