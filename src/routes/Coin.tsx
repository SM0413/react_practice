import { useParams } from "react-router-dom";

interface IPrams {
  coinId: string;
}

export function Coin() {
  const { coinId } = useParams<keyof IPrams>();
  return <h1>Coin: {coinId}</h1>;
}
