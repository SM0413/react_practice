import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Coin } from "./routes/Coin";
import { Coins } from "./routes/Coins";

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}
export function Router({ toggleDark, isDark }: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="react_practice"
          element={<Coins isDark={isDark} toggleDark={toggleDark} />}
        />
        <Route
          path="react_practice/:coinId/*"
          element={<Coin toggleDark={toggleDark} isDark={isDark} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
