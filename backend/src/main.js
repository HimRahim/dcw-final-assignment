const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const port = 8000;
const uri =
  'mongodb+srv://him_rahim:LleGuKDmSVRWusP3@cluster0.cgxqn.mongodb.net/userDB?retryWrites=true&w=majority';
const TOKEN_SECRET =
  'd9b8c6904f8624938db4c426dbacd280d7f2c190984dc31bb2adce2a8b801aa76f7513ed26170b2aba3100bf13e59967aeef883f301151102331203f4bbdaffc';
const mongoose = require('mongoose');
const User = require('./user');
const Post = require('./post');
mongoose.connect(uri);

app.use(bodyParser.json());
app.use(cors());

app.get('/api/', (req, res) => {
  res.send('Hello World!');
});

const authenticated = (req, res, next) => {
  const auth_header = req.headers['authorization'];
  const token = auth_header && auth_header.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, TOKEN_SECRET, (err, info) => {
    if (err) return res.sendStatus(403);
    req.username = info.username;
    next();
  });
};

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
        picture: result.data.picture,
      };
      break;
  }
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...dbObject,
  });
  User.find({ name: result.data.name })
    .exec()
    .then((doc) => {
      if (doc.length == 0) user.save();
    });
  if (!result.data) {
    res.sendStatus(403);
    return;
  }
  let data = {
    username: result.data.name,
    email: result.data.email
  };
  let access_token = jwt.sign(data, TOKEN_SECRET, { expiresIn: '1800s' });
  res.send({ access_token, username: data.username });
});

app.get('/api/info', authenticated, (req, res) => {
  User.find({ email: req.username })
    .exec()
    .then((doc) => {
      res.send({
        'ok': 1,
        name: doc[0].name,
        email: doc[0].email,
        picture: doc[0].picture
      })
    });
});

app.post('/api/post', authenticated, (req, res) => {
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    postBy: req.body.postBy,
    email: req.body.email,
    content: req.body.content
  })
  post.save().then(result => console.log(result))
  console.log(req.body.content);
  res.send(req.body.content)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});