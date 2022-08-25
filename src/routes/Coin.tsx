import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
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
  justify-content: space-around; //메인축 방향으로 아이템을들 정렬하는 속성 참고 https://studiomeal.com/archives/197
  align-items: center; //수직축 방향으로 아이템을들 정렬하는 속성 참고 https://studiomeal.com/archives/197
  span {
    font-size: 20px;
    color: tomato;
  }
`;

interface IPrams {
  coinId: string;
}

interface IRouteState {
  name: string;
}

export function Coin() {
  const { coinId } = useParams<keyof IPrams>();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const state = location.state as IRouteState;
  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <Container>
      <Header>
        <Link to={"/"}>
          <img src={require("../img/GoBack.png")} alt="goBack" />
        </Link>
        <Title>
          {state?.name || (
            <span> State가 존재하지 않습니다. 뒤로가기를 눌러주세요.</span>
          )}
        </Title>
        {/** justify-content: space-between; 으로 <Title>코인 을 중앙으로 위치하게 하기 위한 p태그 */}
        <p />
      </Header>
      {loading ? (
        <Box>
          <img src={require("../img/Loading.png")} alt="Loading" />
          <span>Loading....</span>
        </Box>
      ) : null}
    </Container>
  );
}
