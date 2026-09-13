import { configDotenv } from 'dotenv';
import app from './src/app.js';
import { connectDb } from './src/config/db.js';
configDotenv();
const PORT = process.env.PORT || 3000;
connectDb();
app.listen(PORT, () => {
  console.log('Server is listening at port:', PORT);
});