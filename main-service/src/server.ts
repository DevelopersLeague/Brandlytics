import { App } from './app';

const PORT = 8080;

const app = new App([]);

app.expressApp.listen(PORT,()=>{
  console.log(`server started on port: ${PORT}`);
})
