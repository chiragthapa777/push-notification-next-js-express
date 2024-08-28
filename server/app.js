const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/service-account-file.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

app.post('/send-notification', (req, res) => {
  const { token, notification } = req.body;

  const message = {
    token,
    notification,
  };

  admin.messaging()
    .send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
      res.status(200).send('Notification sent successfully');
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      res.status(500).send('Failed to send notification');
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
