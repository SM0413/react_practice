import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api/coinAPI";
import ApexChart from "react-apexcharts";
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
  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["Histroy Of", coinId],
    () => fetchCoinHistory(String(coinId))
  );

  return (
    <div>
      {isLoading ? (
        "Loading...."
      ) : (
        <ApexChart
          type="line"
          series={[
            { name: "price", data: data?.map((price) => price.close) as [] }, //data에 값이 있다면 price.close값을 data에 값이 없다면 [](빈값)값을 입력한다.
          ]}
          options={{
            theme: { mode: "dark" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 1,
            },
            xaxis: {
              labels: { show: false },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
}
