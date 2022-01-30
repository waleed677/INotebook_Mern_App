const connectToMongo = require('./db');
var cors = require('cors')
connectToMongo();

const express = require('express');
const { use } = require('./routes/auth');
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`InoteBook app listening at http://localhost:${port}`)
})