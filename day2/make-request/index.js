const axios = require("axios");
module.exports = async function (context, input) {
  const response = await axios({
    url: input.url,
    method: "get",
  });
  return response.data;
};
