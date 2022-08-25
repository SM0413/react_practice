import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { json } from "stream/consumers";
import styled, { keyframes } from "styled-components";

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
`;

const Box = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 10vh;
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
  justify-content: center; //메인축 방향으로 아이템을들 정렬하는 속성 참고 https://studiomeal.com/archives/197
  align-items: center; //수직축 방향으로 아이템을들 정렬하는 속성 참고 https://studiomeal.com/archives/197
`;

const CoinsList = styled.ul`
  padding: 0px 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(prop) => prop.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    transition: color 0.3s ease-in; //정해진 시간 동안 요소의 속성값을 부드럽게 변화 참고 http://www.tcpschool.com/css/css3_transform_transition
    padding: 20px; // li위에 마우스를 올리면 글자가 아니더라도 Link할 수 있게 해줌
    display: block;
  }
  &:hover {
    a {
      color: ${(prop) => prop.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(color) => color.theme.accentColor};
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
export function Coins() {
  const [coins, setCoins] = useState<ICoins[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Box>
          <img src={require("../img/Loading.png")} alt="Loading" />
          <span>Loading....</span>
        </Box>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={coin.id}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
