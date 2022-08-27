import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api/coinAPI";

interface IPropsType {
  coinId: string;
}

interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
export function Chart({ coinId }: IPropsType) {
  const { isLoading, data } = useQuery<ICoinHistory>(
    ["Histroy Of", coinId],
    () => fetchCoinHistory(String(coinId))
  );

  return <div>{isLoading ? "Loading...." : "Chart"}</div>;
}
