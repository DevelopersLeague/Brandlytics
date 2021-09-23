import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { APIClient } from "./lib/api";

(async () => {
  const client = new APIClient({
    tokenKey: "token",
    serverBaseUrl: process.env.REACT_APP_API_SERVER,
  });
  const user = await client.login({
    username: "aniket_more3",
    password: "password123",
  });
  console.log(user);
})().catch(console.log);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
