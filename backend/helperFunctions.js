const { default: axios } = require("axios");
const { error } = require("console");

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
      }
    })
    .catch((error) => {
      console.log(`Input: ${error.config.data}`);
      console.log(error.response.data);
      res.sendStatus(400);
    });
};
