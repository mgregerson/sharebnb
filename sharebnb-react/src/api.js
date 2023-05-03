import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

class shareBnbApi {
  static token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" +
    ".eyJ1c2VybmFtZSI6IkpvaG4gU21pdGgifQ" +
    ".t_lzxBsYc6BNfwldAFC3LWEsmqd2TI-s6dqtbJ7VNZk";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method, this.token);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${shareBnbApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async addRental(inputData) {
    let res = await this.request("rentals/john_doe/add", { inputData }, "post");
    return res.rental;
  }
}

export default shareBnbApi;
