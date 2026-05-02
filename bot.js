const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let INSTANCE_ID = process.env.INSTANCE_ID;
const TOKEN = process.env.TOKEN;

// Auto-fix: Add "instance" if user forgot it
if (INSTANCE_ID && !INSTANCE_ID.startsWith('instance')) {
  INSTANCE_ID = 'instance' + INSTANCE_ID;
  console.log('Auto-fixed INSTANCE_ID to:', INSTANCE_ID);
}

app.post('/', async (req, res) => {
  console.log('Webhook hit:', req.body);

  try {
    const data = req.body;
    
    // Don't reply to your own messages
    if (data.fromMe) {
      console.log('Ignoring own message');
      return res.sendStatus(200);
    }

    const from = data.from;
    console.log('Sending reply to:', from);

    // Send the reply
    const url = `https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`;
    console.log('Using URL:', url);
    
    await axios.post(url, {
      token: TOKEN,
      to: from,
      body: 'YES BESTIE IT WORKS! 🎉 Render bot is ALIVE!'
    });

    console.log('Reply sent successfully!');
    res.sendStatus(200);

  } catch (error) {
    console.error('ERROR SENDING:', error.response?.data || error.message);
    res.sendStatus(500);
  }
});

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on ${PORT}`));
