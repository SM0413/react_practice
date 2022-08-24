import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
};
const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
};
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
