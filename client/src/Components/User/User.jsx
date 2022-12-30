import styled from "styled-components/macro"

const UserContainer = styled.div`
  display: flex;
  width: max-content;
  height: max-content;
`
const UserIMG = styled.div`
  display: flex;
  width: 45px;
  height: 45px;
`
const UserDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

const Username = styled.p`
  margin: 0;
  font-size: medium;
  color: #0074CC;
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
