import { configDotenv } from 'dotenv';
configDotenv();

const app = (await import('./src/app.js')).default;
const { connectDb } = await import('./src/config/db.js');
const PORT = process.env.PORT || 3000;
await connectDb();
app.listen(PORT, () => {
  console.log('Server is listening at port:', PORT);
});
