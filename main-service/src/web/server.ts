import { App } from './App';
import { ConfigService } from './ConfigService';
import dotenv from 'dotenv';
dotenv.config();

const cs = new ConfigService();

const PORT = Number(cs.get('PORT'));

const app = new App([]);

app.expressApp.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
