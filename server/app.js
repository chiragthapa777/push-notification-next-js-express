const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "hosting-node-d1622",
    private_key_id: process.env.FIREBASE_PRIVATE_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email:
      "firebase-adminsdk-iyytf@hosting-node-d1622.iam.gserviceaccount.com",
    client_id: "100350460595422703388",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-iyytf%40hosting-node-d1622.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
});

const app = express();
app.use(express.json());

app.get("", (req, res) => {
  return res.json({
    data: "hello from the server",
  });
});

app.post("/send", (req, res) => {
  const { token, notification } = req.body;

  const message = {
    token,
    notification,
  };
  /**
   * {
  "token": "token",
  "notification": {
    "title": "from server",
    "body": "this is the actual message"
  },
  "webpush":{
    "link":"/"
  }
}
   */
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.status(200).send("Notification sent successfully");
    })
    .catch((error) => {
      /**
       * if errorInfo.code === messaging/registration-token-not-registered then remove the token from db
       */
      console.log("Error sending message:", error);
      res.status(500).send("Failed to send notification");
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
