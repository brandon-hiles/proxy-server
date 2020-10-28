const express = require('express');
const request = require('request');

const app = express();
const router = express.Router();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/blog', (req, res) => {
  request(
    { url: 'https://medium.com/feed/@brandon.j.hiles' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.send(body);
    }
  )
});

// Netlfiy configurations
app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app);
