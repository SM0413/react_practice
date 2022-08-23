//styled-components를 사용하기 위해 import
import styled, { keyframes } from "styled-components";

//컴포넌트 생성
const Container = styled.div`
  display: flex;
`;

const Emoji = styled.span`
  font-size: 30px;
`;

//에니메이션 효과를 낼 문법 작성
const animation = keyframes`
from{
    transform: rotate(0deg); //from에서는 회전을 하지 않음
}
to{
    transform: rotate(360deg); //to에서 360도 회전을 함 
}
`;

// Box컴포넌트에 에니메이션 효과 추가
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  //에니메이션 효과 추가(끝없이 1초 안에 바뀜)
  animation: ${animation} 1s linear infinite;

  //Box컴포넌에 싸여있는 span태그의 속성을 바꿈
  span {
    font-size: 20px;
    //&==span과 같음 즉 아래 코드는 span:hover{}와 같음
    &:hover {
      font-size: 80px;
    }
  }
  /*위 문법은 만약 Box컴포넌트 안에 있는 태그가 span이 아니라면 해당 속성들을 사용하지 못한다는 단점이 있다. 해당 문제를 해결하기 위해서는 아래와 같이 컴포넌트를 사용하는 방법이 있다.*/
  ${Emoji} {
    &:hover {
      font-size: 80px;
    }
  }
`;
export default function Test() {
  return (
    //컴포넌트를 만들어서 사용
    <Container>
      <Box>
        {/* Box컴포넌트 안에 새로운 HTML태그 생성 해당 태그는 컴포넌트로 존재하는것이 아니지만 Box컴포넌트에서 설정이 가능하다.*/}
        <span>😄</span>
        {/* Emoji컴포넌트를 사용함으로 써 as=""를 사용해 태그를 변경하여도 Box컴포넌트 안에 있는 Emoji 속성을 사용 할 수 있다. */}
        <Emoji>🥰</Emoji>
      </Box>
    </Container>
  );
}
