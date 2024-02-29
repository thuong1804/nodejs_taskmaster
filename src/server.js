import initWebRoutes from './routes/web';
import configViewEngine from './config/viewEngine';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3005;

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//configViewEngine
configViewEngine(app);

//config cooke Parser
app.use(cookieParser())

//config body-parse
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//initWebRoutes
initWebRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })