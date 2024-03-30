import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/common/theme-provider.tsx";
import { Toaster } from "@/components/ui/toaster";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
