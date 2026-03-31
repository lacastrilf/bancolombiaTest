import express from "express";
import axios from "axios";
import qs from "qs";

const app = express();

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api-sdx.apps.ambientesbc.com/ext/sandbox/v1/business-support/it-management/oauth2/token",
      qs.stringify({
        grant_type: "client_credentials",
        client_id:"abbd5e58fc05d8b2846e313dd27cfe73",
        client_secret:"232855d1b9f6248abac93d7428aae652",
        scope: "qr-codes:write:app"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
