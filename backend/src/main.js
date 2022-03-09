const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const port = 8080;

const TOKEN_SECRET ='d9b8c6904f8624938db4c426dbacd280d7f2c190984dc31bb2adce2a8b801aa76f7513ed26170b2aba3100bf13e59967aeef883f301151102331203f4bbdaffc';

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/login', async (req, res) => {
  let token = req.body.token;
  let result;
  switch (req.body.type) {
    case 'facebook':
      result = await axios.get('https://graph.facebook.com/me', {
        params: {
          fields: 'id, name, email, picture',
          access_token: token,
        },
      });
      break;
    case 'google':
      result = await axios.get('https://oauth2.googleapis.com/tokeninfo', {
        params: {
          id_token: token,
        },
      });
  }
  if (!result.data) {
    res.sendStatus(403);
    return;
  }
  let data = {
    username: result.data.email,
  };
  let access_token = jwt.sign(data, TOKEN_SECRET, { expiresIn: '10s' });
  res.send({ access_token, username: data.username });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
