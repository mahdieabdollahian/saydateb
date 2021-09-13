import axios from "axios";
import { getSavedData } from "./storeService";

const profileUrl = "/rest/getUserProfile";
if (getSavedData("token")) {
  axios.defaults.headers.common["x-auth-token"] = getSavedData("token");
}

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // if (error.response.status === 401) {
//     //   setTimeout(() => {
//     //     window.location.pathname = "/login";
//     //   }, 3000);
//     // }
//     if (error.response.data) {
//       return Promise.reject(error.response.data);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );
export function getProfileData() {
  return axios.get("/mha", {
    headers: {
      requestedurl: profileUrl,
    },
  });
}
const convertParams = (params) => {
  const serachParams = new URLSearchParams(params);
  return serachParams.toString();
};
const getRequest = async (url, params) => {
  let headers;
  if (params) {
    const queryParam = convertParams(params);
    headers = {
      requestedurl: `${url}?${queryParam}`,
    };
  } else {
    headers = {
      requestedurl: url,
    };
  }
  return axios.get("/mha", {
    headers,
  });
};
const postRequest = async (url, body, params) => {
  let headers;
  if (params) {
    const queryParam = convertParams(params);
    headers = {
      requestedurl: `${url}?${queryParam}`,
    };
  } else {
    headers = {
      requestedurl: url,
    };
  }
  return axios.post("/mha", body, {
    headers,
  });
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  getRequest,
  postRequest,
};
