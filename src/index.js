import initWebRoutes from './routes/web';
import configViewEngine from './configs/viewEngine';
import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3005;

//configViewEngine 
configViewEngine(app);

//config body-parse
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//initWebRoutes
initWebRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })