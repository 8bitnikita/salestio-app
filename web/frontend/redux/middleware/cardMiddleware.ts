import axios from 'axios'
import { IProduct } from '../../type/card.interface'
import { productsReceived, totalPriceChanged } from '../reducers/ cardSlice'
import { AppDispatch } from '../store'

const currencyRates = {
  USD: 1.0,
  EUR: 0.92,
  JPY: 131.79,
}

// This function is used to get the list of products from a mock API and
// dispatch an action to update the state with the received data
export const getProducts: any = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.get(
    'https://642312aa77e7062b3e2a57c7.mockapi.io/api/v1/products'
  )
  dispatch(productsReceived(data))
}

// This function calculates the total price of the added products,
// after converting the prices to USD based on the exchange rates
export const calculateTotal: any =
  (addedProducts: IProduct[]) => (dispatch: AppDispatch) => {
    let total = 0
    addedProducts.forEach((item: IProduct) => {
      const rate = currencyRates[item.currency] / currencyRates['USD']
      total += (item.amount * item.price) / rate
    })
    dispatch(totalPriceChanged(+total.toFixed(2)))
  }

// This function saves the final order details to a mock API
export const saveResult: any =
  (addedProducts: IProduct, totalPrice: number) => async () => {
    const { data } = await axios.post(
      'https://642312aa77e7062b3e2a57c7.mockapi.io/api/v1/result',
      {
        addedProducts: addedProducts,
        finalCurrency: 'USD',
        totalPrice: `Total: ${totalPrice} USD`,
      }
    )
    console.log(data)
    alert('Saved successfully!')
  }
