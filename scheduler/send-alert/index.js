const axios = require("axios");
const SEND_GRID_API_URL = "https://api.sendgrid.com/v3/mail/send";
const sendEmail = async (email) => {
  const data = {
    from: {
      email: "simona_cotin@yahoo.com",
    },
    personalizations: [
      {
        to: [
          {
            email: email,
          },
        ],
        subject: "Your scheduled job failed",
      },
    ],
    content: [
      {
        type: "text/plain",
        value: "Check your schedules jobs, one of them might;ve failed",
      },
    ],
  };
  const response = await axios({
    url: SEND_GRID_API_URL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    data: data,
  });
  return response;
};
module.exports = async function (context, email) {
  try {
    const result = await sendEmail(email);
    context.res = {
      body: { message: "Check your inbox" },
    };
  } catch (error) {
    console.log(error);
    context.res = {
      status: 500,
      body: { message: "An error has occured, please try again later." },
    };
  }
};
