import requests from "./httpServices";

const OrderServices = {
  addOrder: async (body, headers) => {
    return requests.post("/order/add", body, headers);
  },

  createPaymentIntent: async (body) => {
    return requests.post("/order/create-payment-intent", body);
  },

  getOrderCustomer: async ({ page = 1, limit = 8 }) => {
    return requests.get(`/order?limit=${limit}&page=${page}`);
  },
  getOrderById: async (id, body, headers) => {
    return requests.get(`/orders/${id}`,);
  },
};

export default OrderServices;
