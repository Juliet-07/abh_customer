import requests from "./httpServices";

const CustomerServices = {

  // verifyEmailAddress: async (body) => {
  //   return requests.post("/customer/verify-email", body);
  // },

  // signUpWithProvider(token, body) {
  //   return requests.post(`/customer/signup/${token}`, body);
  // },

  // forgetPassword: async (body) => {
  //   return requests.put("/customer/forget-password", body);
  // },

  // resetPassword: async (body) => {
  //   return requests.put("/customer/reset-password", body);
  // },

  // changePassword: async (body) => {
  //   return requests.post("/customer/change-password", body);
  // },

  // updateCustomer: async (id, body) => {
  //   return requests.put(`/customer/${id}`, body);
  // },

  // Abh-endpoints
  registerCustomer: async (body) => {
    return requests.post(`/user`, body);
  },

  customerLogin: async (body) => {
    return requests.post("/user/login", body);
  },

  verifyEmailAddress: async (email) => {
    return requests.post(`/user/request-verification${email}`);
  },

  registerCustomer: async (token, body) => {
    return requests.post(`/user/register/${token}`, body);
  },

  signUpWithProvider(body) {
    return requests.post("/user/signup", body);
  },
};

export default CustomerServices;
