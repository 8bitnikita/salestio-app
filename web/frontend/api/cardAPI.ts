import axios from "axios";

export const cardAPI: any = {
  async getProducts() {
    const { data } = await axios.get(
      "https://642312aa77e7062b3e2a57c7.mockapi.io/api/v1/products"
    );
    console.log(data);
    return data;
  },
};
