// 라이브러리 및 라이브러리 메소드
import styled from "styled-components/macro"

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const UserContainer = styled.div`
  display: flex;
  height: max-content;
  width: max-content;
`

const UserIMG = styled.div`
  display: flex;
  height: 45px;
  width: 45px;
`

const UserDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

const Username = styled.p`
  color: #0074CC;
  font-size: medium;
  margin: 0;
`

export default function User({data}) {

  return (
    <UserContainer>
      <UserIMG>
        <img src={data.image} alt="profile"></img>
      </UserIMG>
      <UserDetailContainer>
        <Username>{data.username}</Username>
        <p css={`color: gray; margin: 0; font-size: small;`}>{data.location}</p>
      </UserDetailContainer>
    </UserContainer>
  )
}
