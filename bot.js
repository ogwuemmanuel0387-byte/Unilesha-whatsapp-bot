const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = process.env.TOKEN;
const INSTANCE_ID = process.env.INSTANCE_ID;

app.post('/', async (req, res) => {
  console.log('Webhook hit:', req.body);

  try {
    const data = req.body;
    const from = data.from;
    const body = data.body;

    // Don't reply to your own messages
    if (data.fromMe) {
      return res.sendStatus(200);
    }

    console.log('Sending reply to:', from);

    // Send the reply
    await axios.post(`https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`, {
      token: TOKEN,
      to: from,
      body: 'YES BESTIE IT WORKS! 🎉 Render bot is ALIVE!'
    });

    console.log('Reply sent successfully!');
    res.sendStatus(200);

  } catch (error) {
    console.error('ERROR SENDING:', error.message);
    res.sendStatus(500);
  }
});

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on ${PORT}`));
