import axios from "axios";
import qs from "qs";

//For posting data
export const post = (url: string, param: any) => {
  const URL = `http://localhost:3001${url}`;
  return axios(URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(param),
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

//For getting data

export const get = (url: string) => {
  const URL = `http://localhost:3001${url}`;
  return axios(URL, {
    method: "get",
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

//for update

export const put = async (url: string, param: any) => {
  const URL = `http://localhost:3001${url}`;
  try {
    const response = await axios(URL, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(param),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//For delete

export const deleteData = (url: string) => {
  const URL = `http://localhost:3001${url}`;
  return axios
    .delete(URL, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

//file submit

export const Documentpost = (url: string, param: any) => {
  const URL = `http://localhost:3001${url}`;
  return axios(URL, {
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: param,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

//download file
export const downloadDocument = (url: string, serverRelativePath: any) => {
  console.log(serverRelativePath);

  const URL = `http://localhost:3001${url}`;
  return axios
    .get(URL, {
      params: {serverRelativePath},
      paramsSerializer: (params) => {
        return qs.stringify(params, { encode: false });
      },
      responseType: "blob",
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
