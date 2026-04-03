import React from 'react';
import "@/shared/assets/styles/vars.css";
import ReactDOM from 'react-dom/client';
import './index.scss';
import '../locales/i18n';
import App from "./App";
import { BrowserRouter } from "react-router-dom";
w
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
