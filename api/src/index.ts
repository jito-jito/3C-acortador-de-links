import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import { FirebaseDb }  from './libs/firebase'
const app = express();
const port = process.env.PORT || 3000;

FirebaseDb.initialize()

app.use(bodyParser.json())
app.use(router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
