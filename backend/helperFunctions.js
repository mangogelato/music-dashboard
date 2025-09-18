const { default: axios } = require("axios");
const { error } = require("console");
require('dotenv').config();

// Get access token from API
exports.getAccessToken = (res, authOptions) => {
  axios(authOptions)
    .then((response) => {
      if (response.status == 200) {
        res.json({
          accessToken: response.data.access_token,
          refreshToken: response.data.refreshToken || null,
          expiresIn: response.data.expires_in,
        });
        console.log(`Success! Access Token: ${response.data.access_token}`);
      }
    })
    .catch((error) => {
      //console.log(`Input: ${JSON.stringify(error.config, "", " ")}`);
      //console.log(error.config);
      console.log(`Error: ${error.response.data}`);
      res.sendStatus(400);
    });
};
