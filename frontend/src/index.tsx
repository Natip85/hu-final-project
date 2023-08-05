import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { UserProvider } from "./context/userContext";
import "./index.css"
import { SearchProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <SearchProvider>
      <UserProvider>
        <App />
      </UserProvider>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
