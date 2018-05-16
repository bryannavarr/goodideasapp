import axios from "axios";

const headers = {};

const baseUrl = `${process.env.REACT_APP_BASEPATH}/fileupload/getSignedUrl`;

export function sign(file) {
  const config = {
    method: "GET",
    headers,
    params: { filename: file.name, filetype: file.type }
  };
  return axios(baseUrl, config)
    .then(responseSuccessHandler)
    .catch(responseErrorHandler);
}

export function save(signedUrl, file) {
  debugger;
  const config = {
    headers: {
      "Content-Type": file.type
    }
  };
  return axios
    .put(signedUrl, file, config)
    .then(data => {
      debugger;
      return data;
    })
    .catch(err => {
      Promise.reject(err);
    });
}

const responseSuccessHandler = response => {
  return response.data.item;
};

const responseErrorHandler = error => {
  console.log(error);
  return Promise.reject(error   );
};
