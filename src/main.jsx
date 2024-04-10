import React from "react";
import ReactDOM from "react-dom/client";
import StateContextProvider from "@/contexts/StateContext";
import App from "@/components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </React.StrictMode>
);
