const axios = require("axios");
const getRequest = async (url) => {
  const response = await axios({
    url: url,
    method: "get",
  });
  return response.data;
};

const postRequest = async (url, payload) => {
  const response = await axios({
    url: url,
    method: "post",
    data: JSON.parse(payload),
  });
  return response.data;
};
module.exports = async function (context, input) {
  if (input.method === "GET") return getRequest(input.url);
  else if (input.method === "POST")
    return postRequest(input.url, input.payload);
};
