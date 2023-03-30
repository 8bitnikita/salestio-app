export interface IProduct {
  productTitle: string;
  amount: number;
  price: number;
  currency: string;
  id: string;
}

export interface ICard {
  products: IProduct[];
  addedProducts: IProduct[];
  totalPrice: number;
}
