import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
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
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
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

export function Coin() {
  const { coinId } = useParams<keyof IPrams>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const state = location.state as IRouteState;
  const [info, setInfo] = useState<IInfoData>();
  const [price, setPrice] = useState<IPriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPrice(priceData);
      console.log(infoData);
      console.log(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Link to={"/"}>
          <img src={require("../img/GoBack.png")} alt="goBack" />
        </Link>
        <Title>{state?.name ? state.name : loading ? null : info?.name}</Title>
        {/** justify-content: space-between; 으로 <Title>코인 을 중앙으로 위치하게 하기 위한 p태그 */}
        <p />
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
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Routes>
            <Route path={"price"} element={<Price />} />
            <Route path={"chart"} element={<Chart />} />
          </Routes>
        </>
      )}
    </Container>
  );
}
