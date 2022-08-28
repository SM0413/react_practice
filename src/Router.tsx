import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Coin } from "./routes/Coin";
import { Coins } from "./routes/Coins";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="react_practice" element={<Coins />} />
        <Route path="react_practice/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
}
