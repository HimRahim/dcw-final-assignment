const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const port = 8080;
const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://him_rahim:LleGuKDmSVRWusP3@cluster0.cgxqn.mongodb.net/userDB?retryWrites=true&w=majority';
const TOKEN_SECRET =
  'd9b8c6904f8624938db4c426dbacd280d7f2c190984dc31bb2adce2a8b801aa76f7513ed26170b2aba3100bf13e59967aeef883f301151102331203f4bbdaffc';

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const authenticated = (req, res, next) => {
  const auth_header = req.headers['authorization']
  const token = auth_header && auth_header.split(' ')[1]
  if (!token)
    return res.sendStatus(401);
  jwt.verify(token, TOKEN_SECRET, (err, info) => {
    if (err) return res.sendStatus(403);
    req.username = info.username
    next();
  })
}

app.post('/api/login', async (req, res) => {
  let token = req.body.token;
  let result;
  let dbObject;
  switch (req.body.type) {
    case 'facebook':
      result = await axios.get('https://graph.facebook.com/me', {
        params: {
          fields: 'id, name, email, picture',
          access_token: token,
        },
      });
      console.log(result.data.picture);
      dbObject = {
        name: result.data.name,
        email: result.data.email,
        picture: result.data.picture.data.url,
      };
      break;
    case 'google':
      result = await axios.get('https://oauth2.googleapis.com/tokeninfo', {
        params: {
          id_token: token,
        },
      });
      dbObject = {
        name: result.data.name,
        email: result.data.email,
        picture: result.data.picture
      }
      break;
  }
  if (!isOnDatabase(dbObject.email)) updateDatabase(dbObject);
  console.log(result.data)
  if (!result.data) {
    res.sendStatus(403);
    return;
  }
  let data = {
    username: result.data.email,
  };
  let access_token = jwt.sign(data, TOKEN_SECRET, { expiresIn: '1800s' });
  res.send({ access_token, username: data.username });
});

app.get('/api/info', authenticated, (req, res) => {
  res.send({ 'ok': 1, username: req.username });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const updateDatabase = (dbObject) => {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db('userDB');
    var myobj = dbObject;
    dbo.collection('user').insertOne(myobj, function (er, res) {
      if (er) throw er;
      console.log('1 document inserted');
      db.close();
    });
  });
};

const isOnDatabase =(email) => {
  var found = false;
  MongoClient.connect(uri,function (err, db) {
    if (err) throw err;
    var dbo = db.db('userDB');
    var query = { email };
    dbo
      .collection('user')
      .find(query)
      .toArray(function (er, result) {
        if (er) throw er;
        if (result.length != 0)
          found = true;
        db.close();
      });
  });
  return found;
};
