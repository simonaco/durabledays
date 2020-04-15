const axios = require("axios");
const getRequest = async (params) => {
  const response = await axios(params);
  return response.data;
};

const postRequest = async ({ url, method, payload }) => {
  const response = await axios({
    url,
    method,
    data: JSON.parse(payload),
  });
  return response.data;
};
module.exports = async function (context, input) {
  try {
    if (input.method === "GET") {
      const res = await getRequest({ method: input.method, url: input.url });
      return res;
    } else if (input.method === "POST") {
      const res = await postRequest(input);
      return res;
    }
  } catch (err) {
    context.log(`Scheduled API call encountered an error: ${err}`);
    throw new Error(err);
  }
};
