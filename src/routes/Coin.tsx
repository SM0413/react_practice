import { Link, useParams } from "react-router-dom";

interface IPrams {
  coinId: string;
}

export function Coin() {
  const { coinId } = useParams<keyof IPrams>();
  return (
    <Link to={"/"}>
      <img src={require("../img/GoBack.png")} alt="goBack" />
      {/** justify-content: space-between; 으로 <Title>코인 을 중앙으로 위치하게 하기 위한 p태그 */}
      <p />
    </Link>
  );
}
