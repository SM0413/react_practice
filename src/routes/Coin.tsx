import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchInfo, fetchPrice } from "../api/coinAPI";
import { Chart } from "./Chart";
import { Price } from "./Price";
const animation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  padding: 0 10px; //위, 아래는 0 / 좌우는 10씩 padding을 줌 참고 http://www.tcpschool.com/css/css_boxmodel_padding
  max-width: 480px;
  margin: auto;
  background-color: ${(color) => color.theme.bgColor};
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(color) => color.theme.accentColor};
`;

const Box = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 15vh;
  img {
    max-width: 300px;
    position: absolute;
    animation: ${animation} 1s linear infinite;
  }
  span {
    color: ${(prop) => prop.theme.textColor};
    font-size: 20px;
  }
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between; //메인축 방향으로 아이템을들 정렬하는 속성 참고 https://studiomeal.com/archives/197
  align-items: center; //수직축 방향으로 아이템을들 정렬하는 속성 참고 https://studiomeal.com/archives/197
  span {
    font-size: 20px;
    color: tomato;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(color) => color.theme.bgColor};
  border: 1px solid ${(prop) => prop.theme.textColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  span:first-child {
    color: ${(props) => props.theme.textColor};
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: ${(props) => (props.isActive ? "bolder" : 200)};
  background-color: ${(color) => color.theme.bgColor};
  border: 1px solid ${(prop) => prop.theme.textColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
interface IPrams {
  coinId: string;
}

interface IRouteState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {
  isDark: boolean;
  toggleDark: () => void;
}

export function Coin({ isDark, toggleDark }: ICoinProps) {
  const { coinId } = useParams<keyof IPrams>();
  const location = useLocation();
  const state = location.state as IRouteState;
  const priceMatch = useMatch("react_practice/:coinId/price");
  const chartMatch = useMatch("react_practice/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    [coinId, "Data"],
    () => fetchInfo(String(coinId))
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    [coinId, "priceData"],
    () => fetchPrice(String(coinId))
    // { refetchInterval: 5000 }
  );

  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        {state?.name ? state.name : loading ? null : infoData?.name}
      </Helmet>
      <Header>
        <Link to={"/react_practice"}>
          <img src={require("../img/GoBack.png")} alt="goBack" />
        </Link>
        <Title>
          {state?.name ? state.name : loading ? null : infoData?.name}
        </Title>
        {/** justify-content: space-between; 으로 <Title>코인 을 중앙으로 위치하게 하기 위한 p태그 */}
        {isDark ? (
          <img
            onClick={toggleDark}
            src={require("../img/darkmode.png")}
            alt="presentmode"
          />
        ) : (
          <img
            onClick={toggleDark}
            src={require("../img/lightmode.png")}
            alt="presentmode"
          />
        )}
      </Header>
      {loading ? (
        <Box>
          <img src={require("../img/Loading.png")} alt="Loading" />
          <span>Loading....</span>
        </Box>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={"chart"}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={"price"}>Price</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route
              path={"price"}
              element={<Price coinId={coinId as string} />}
            />
            <Route
              path={"chart"}
              element={<Chart isDark={isDark} coinId={coinId as string} />}
            />
          </Routes>
        </>
      )}
    </Container>
  );
}
