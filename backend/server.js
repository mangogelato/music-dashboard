const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getAccessToken } = require("./helperFunctions");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const REDIRECT_URI = process.env.REDIRECT_URI;

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  var authOptions = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    data: {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    },
    json: true,
  };

  getAccessToken(res, authOptions);
});

app.post("/login", (req, res) => {
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
        new Buffer.from(
          process.env.SPOTIFY_API_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_API_SECRET_ID
        ).toString("base64"),
    },
    responseType: "json",
  };

  getAccessToken(res, authOptions);
});

app.listen(3001);
