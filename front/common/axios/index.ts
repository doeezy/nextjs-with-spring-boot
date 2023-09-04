import axios from "axios";
import {
  apiAxiosInterface,
  commonResponse
} from "@/common/axios/apiAxiosInterface";

//create an axios instance
const api: apiAxiosInterface = axios.create({
  baseURL: ""
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

let errMsg = "시스템 에러가 발생했습니다. 관리자에게 문의하세요.";
api.interceptors.response.use(
  async (response: commonResponse<any>) => {
    let data = response.data;
    if (data.hasOwnProperty("data")) {
      return data.data;
    } else {
      return data;
    }
    // let data = response.data;
    // if (data.hasOwnProperty("result") && data.result === 0) {
    //   let errorMessage = data.errorMessage ? data.errorMessage : errMsg;
    //   alert(errorMessage);
    //   return Promise.resolve(false);
    // }
    //
    // if (data.data === undefined) {
    //   return data;
    // }
    //
    // return data.data;
  },

  (error) => {
    return Promise.reject(error);
  }
);
export default api;
