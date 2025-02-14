import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import { AlertsList } from "./components/shared/AlertList.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/time-control-app">
      <AuthProvider>
        <AlertProvider>
          <App />
          <AlertsList />
        </AlertProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
