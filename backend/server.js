const { default: axios } = require("axios");
const { error } = require("console");
const express = require("express");
const { json } = require("stream/consumers");
const app = express();

const REDIRECT_URI = "http://localhost:3000";

app.get("/login", (req, res) => {
  const code = req.body.code;

  const authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    responseType: "json",
  };

  axios(authOptions)
    .then((response) => {
      if (response.status == 200) {
        res.json({
          accessToken: response.data.access_token,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expires_in,
        });
      }
    })
    .catch((error) => {
      res.status(400);
      console.log(error);
    });
});
