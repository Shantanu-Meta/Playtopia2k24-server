require('dotenv').config();
const express = require('express')
const app = express()
const connectWithMongo = require('./MongoDB/db')
const port = process.env.PORT || 5000; 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors')

app.use(cors());
connectWithMongo();


app.get('/', (req, res) => {
  res.send('Hello Playtopia!')
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/event', require('./routes/register'));
app.use('/api/admin', require('./routes/admin'));


app.listen(port, () => {
  console.log(`The app is UP & serving Playtopia http://localhost:${port}`)
})

