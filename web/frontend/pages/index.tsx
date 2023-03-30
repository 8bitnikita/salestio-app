import { TitleBar } from '@shopify/app-bridge-react'
import { Button, Card, Layout, Page } from '@shopify/polaris'
import React from 'react'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  calculateTotal,
  getProducts,
  saveResult,
} from '../redux/middleware/cardMiddleware'
import { productsAdded, productsDeleted } from '../redux/reducers/ cardSlice'
import { AppRootState } from '../redux/store'
import { IProduct } from '../type/card.interface'

import './main.css'

export default function HomePage() {
  // Initialize the Redux dispatcher and selector
  const dispatch = useDispatch()
  const { products, addedProducts, totalPrice } = useSelector(
    (state: AppRootState) => state.card
  )

  // Load the products on page load and when the added products array changes
  useEffect(() => {
    dispatch(getProducts())
  }, [])

  // Update the total price when the added products array changes
  useEffect(() => {
    dispatch(calculateTotal(addedProducts))
  }, [addedProducts])

  // Add a new random product to the added products array
  const addNewProductHandler = () => {
    const randomNumber = Math.floor(Math.random() * 10)
    dispatch(productsAdded([products[randomNumber]]))
  }

  // Remove a product from the added products array
  const deleteProductHandler = (id: string) => {
    dispatch(
      productsDeleted(addedProducts.filter((item: IProduct) => item.id !== id))
    )
  }

  // Saving final data and sending it to the server
  const saveResultHandler = async () => {
    dispatch(saveResult(addedProducts, totalPrice))
  }

  const allProducts = addedProducts.map((item: IProduct) => {
    return (
      <div className="item-wrapper">
        <span className="item">{item.productTitle}</span>
        <span className="item">QTY: {item.amount}</span>
        <span className="item-last">Price: {item.price}</span>
        <span className="currency">{item.currency}</span>
        <Button onClick={() => deleteProductHandler(item.id)}>Delete</Button>
      </div>
    )
  })

  return (
    <Page narrowWidth>
      <TitleBar title="App name" />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Button onClick={addNewProductHandler}>Add product</Button>
            {allProducts.length ? (
              <div>{allProducts}</div>
            ) : (
              <div className="message">No items have been added.</div>
            )}
            <div className="final-currency">Final Currency: USD</div>
            <div className="total">Total: {totalPrice} USD</div>
            <Button onClick={saveResultHandler}>Save</Button>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
