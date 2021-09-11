import { App } from "./App";
import dotenv from 'dotenv';
dotenv.config();

const PORT = 8080;

const app = new App([]);

app.expressApp.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
