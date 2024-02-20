import initWebRoutes from './routes/web';
import configViewEngine from './configs/viewEngine';
import express from 'express';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3005;

//configViewEngine 
configViewEngine(app);

//initWebRoutes
initWebRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })