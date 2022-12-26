import styled from "styled-components/macro"
import user1 from '../../usericons/user1.png'
import user2 from '../../usericons/user2.png'
import user3 from '../../usericons/user3.png'
import user4 from '../../usericons/user4.png'

import { useRef } from "react"
const imgArr = [user1, user2, user3, user4];


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

export default function User() {
  const imgSrc = useRef();
  imgSrc.current = Math.floor(Math.random() * 4);

  return (
    <UserContainer>
      <UserIMG>
        <img src={imgArr[imgSrc.current]} alt="profile"></img>
      </UserIMG>
      <UserDetailContainer>
        <Username>Ananimous User</Username>
        <p css={`color: gray; margin: 0; font-size: small;`}>Seoul, Korea</p>
      </UserDetailContainer>
    </UserContainer>
  )
}
