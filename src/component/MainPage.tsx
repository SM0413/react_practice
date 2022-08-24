import { fetchCoins } from "../api/CoinsAPI";
import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 0px 20px;
`;

const animation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  color: ${(props) => props.theme.textColor};
`;

const Img = styled.img`
  animation: ${animation} 4s linear infinite;
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Box = styled.div`
  margin-top: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: ${(props) => props.theme.textColor};
    font-size: 50px;
  }
  img {
    position: absolute;
    animation: ${animation} 1s linear infinite;
  }
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function MainPage() {
  const { isLoading, data } = useQuery<ICoins[]>("AllCoins", fetchCoins);
  return (
    <Container>
      <Title>Coins</Title>
      {isLoading ? (
        <Box>
          <img alt="Loading" src={require("../img/Loading.png")} />
          <span>Loading....</span>
        </Box>
      ) : (
        <CoinList>
          {data?.slice(0, 1000).map((coin) => (
            <Coin key={coin.id}>
              <Img
                src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
              />
              <strong>{coin.id}</strong>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default MainPage;
