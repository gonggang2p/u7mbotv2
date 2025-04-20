const express = require('express');
const bodyParser = require('body-parser');
const { appendUserToSheet } = require('./googleSheet');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const events = req.body.events;
  if (!events || !Array.isArray(events)) {
    return res.status(200).send('No events');
  }

  for (const event of events) {
    if (event.type === 'follow' || event.type === 'message') {
      const userId = event.source.userId;
      await appendUserToSheet(userId);
    }
  }

  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('LINE bot is running.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
