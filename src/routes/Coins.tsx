import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { fetchCoins } from "../api/coinAPI";
import { isDarkAtom } from "../atoms";

const animationRotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  padding: 0 10px; //위, 아래는 0 / 좌우는 10씩 padding을 줌 참고 http://www.tcpschool.com/css/css_boxmodel_padding
  max-width: 400px;
  margin: auto;
`;

const Box = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 10vh;
  img {
    max-width: 300px;
    position: absolute;
    animation: ${animationRotate} 1s linear infinite;
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

  img {
    :hover {
      cursor: pointer;
    }
  }
`;

const CoinsList = styled.ul`
  padding: 0px 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const Coin = styled.li`
  background-color: ${(color) => color.theme.bgColor};
  color: ${(prop) => prop.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid ${(prop) => prop.theme.textColor};
  a {
    transition: color 0.1s ease-in; //정해진 시간 동안 요소의 속성값을 부드럽게 변화 참고 http://www.tcpschool.com/css/css3_transform_transition
    padding: 20px; // li위에 마우스를 올리면 글자가 아니더라도 Link할 수 있게 해줌
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      font-weight: bolder;
      color: ${(prop) => prop.theme.accentColor};
    }
    img {
      animation: ${animationRotate} 1s linear infinite;
    }
  }
  img {
    width: 23px;
    height: 23px;
    margin-right: 10px;
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
  const { isLoading, data } = useQuery<ICoins[]>(["allCoins"], fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDarkAtom((prev) => !prev);
  return (
    <Container>
      <Helmet>
        <Title>코인</Title>
      </Helmet>
      <Header>
        <p />
        <Title>코인</Title>
        {isDark ? (
          <img
            onClick={toggleDarkAtom}
            src={require("../img/darkmode.png")}
            alt="presentmode"
          />
        ) : (
          <img
            onClick={toggleDarkAtom}
            src={require("../img/lightmode.png")}
            alt="presentmode"
          />
        )}
      </Header>
      {isLoading ? (
        <Box>
          <img src={require("../img/Loading.png")} alt="Loading" />
          <span>Loading....</span>
        </Box>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={coin.id} state={{ name: coin.name }}>
                <img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt={`${coin.id}.img`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
