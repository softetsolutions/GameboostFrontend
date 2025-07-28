<<<<<<< HEAD
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>
);
=======
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toastConfig, toastStyles } from "./utils/toastConfig";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        {...toastConfig}
        toastOptions={{
          ...toastConfig,
          success: toastStyles.success,
          error: toastStyles.error,
          loading: toastStyles.loading,
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
>>>>>>> master
