import { Link } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  padding: 0 10px; //위, 아래는 0 / 좌우는 10씩 padding을 줌 참고 http://www.tcpschool.com/css/css_boxmodel_padding
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-evenly; //메인축 방향으로 아이템을들 정렬하는 속성 참고 https://studiomeal.com/archives/197
  align-items: center; //수직축 방향으로 아이템을들 정렬하는 속성 참고 https://studiomeal.com/archives/197
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(prop) => prop.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  max-width: 400px;
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

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];
export function Coins() {
  return (
    <Container>
      <Header>
        <img src={require("../img/GoBack.png")} alt="goBack" />
        <Title>코인</Title>
        <p />
        {/** justify-content: space-between; 으로 <Title>코인 을 중앙으로 위치하게 하기 위한 p태그 */}
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={coin.id}>{coin.name} &rarr;</Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
}
