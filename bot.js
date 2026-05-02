
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// THIS IS THE MISSING PIECE - ULTRAMSG HITS HERE
app.post('/', async (req, res) => {
  console.log('Webhook hit:', req.body);
  
  const userMsg = req.body.body;
  const userNumber = req.body.from;
  
  if (userMsg && userMsg.toLowerCase() === 'hi') {
    await axios.post(`https://api.ultramsg.com/${process.env.INSTANCE_ID}/messages/chat`, {
      token: process.env.TOKEN,
      to: userNumber,
      body: 'YES BESTIE IT WORKS! 🎉 Render bot is ALIVE!'
    });
  }
  
  res.sendStatus(200);
});

// THIS FIXES THE PORT CRASH
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});
