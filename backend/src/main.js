const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})