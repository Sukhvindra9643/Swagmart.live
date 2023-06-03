import axios from "axios";


export const payUsingPaytm = async (data) => {
  try {
    console.log('payment api');
    let response = await axios.post(`/api/v1/payment`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling paytm api", error.message);
  }
};
