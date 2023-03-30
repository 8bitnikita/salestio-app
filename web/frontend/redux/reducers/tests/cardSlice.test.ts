import {
  cardSliceReducer,
  productsAdded,
  productsDeleted,
  productsReceived,
  totalPriceChanged,
} from "../ cardSlice";
import { ICard, IProduct } from "../../../type/card.interface";

let initialState: ICard;
let product1: IProduct;
let product2: IProduct;

beforeEach(() => {
  initialState = {
    products: [],
    addedProducts: [],
    totalPrice: 0,
  };

  product1 = {
    productTitle: "Product 1",
    amount: 2,
    price: 10,
    currency: "USD",
    id: "1",
  };

  product2 = {
    productTitle: "Product 2",
    amount: 1,
    price: 20,
    currency: "USD",
    id: "2",
  };
});

describe("cardSlice", () => {
  it("The 'products' array should be equal [product1, product2]", () => {
    const newState = cardSliceReducer(
      initialState,
      productsReceived([product1, product2])
    );

    expect(newState.products).toEqual([product1, product2]);
  });

  it("After adding product to the 'addedProducts' array, the title should be 'Product 2'", () => {
    const newState = cardSliceReducer(initialState, productsAdded([product2]));

    expect(newState.addedProducts[0].productTitle).toEqual("Product 2");
  });

  it("After deleting the product, the length of the array should be equal to 1", () => {
    const state: ICard = {
      ...initialState,
      addedProducts: [product1, product2],
    };

    const newState = cardSliceReducer(state, productsDeleted([product1]));

    expect(newState.addedProducts.length).toBe(1);
  });

  it("Total price should be 50", () => {
    const newState = cardSliceReducer(initialState, totalPriceChanged(50));

    expect(newState.totalPrice).toEqual(50);
  });
});
