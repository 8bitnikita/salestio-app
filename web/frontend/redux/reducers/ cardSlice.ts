import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICard, IProduct } from '../../type/card.interface'

const initialState: ICard = {
  products: [],
  addedProducts: [],
  totalPrice: 0,
}

const cardSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // This reducer updates the `products` array with new products received
    // from the server
    productsReceived(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload
    },

    // This reducer adds new products to the `addedProducts` array
    productsAdded(state, action: PayloadAction<IProduct[]>) {
      state.addedProducts = [...state.addedProducts, ...action.payload]
    },

    // This reducer removes products from the `addedProducts` array
    productsDeleted(state, action: PayloadAction<IProduct[]>) {
      state.addedProducts = action.payload
    },

    // This reducer updates the `totalPrice` value
    totalPriceChanged(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload
    },
  },
})

export const cardSliceReducer = cardSlice.reducer

export const {
  productsReceived,
  productsAdded,
  productsDeleted,
  totalPriceChanged,
} = cardSlice.actions
