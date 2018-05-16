import axiosInstance from "../config/axios.config";

const headers = {};

const baseUrl = `${process.env.REACT_APP_BASEPATH}/ideas`;

export function create(data) {
  const config = {
    method: "POST",
    headers,
    data: data
  };
  return axiosInstance(baseUrl, config);
}

export function readAll() {
  const config = {
    method: "GET",
    headers
  };
  return axiosInstance
    .get(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function update(data) {
  const config = {
    method: "PUT",
    headers,
    data: data
  };
  return axiosInstance(`${baseUrl}/${data._id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function del(id) {
  const config = {
    method: "DELETE",
    headers
  };
  return axiosInstance(`${baseUrl}/${id}`, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

const responseSuccessHandler = response => {
  return response.data;
};

const responseErrorHandler = error => {
  console.log(error);
  return Promise.reject(error);
};
