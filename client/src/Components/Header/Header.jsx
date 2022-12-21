import styled from "styled-components";

const HeaderComponent = styled.header`
  
`

const HeaderContainer = styled.header`
  height: 50px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(248, 249, 249);
  border-top: 3px solid rgb(230, 135, 62);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.05),
    0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Header = () => {
  return <HeaderContainer>왜 아무것도 안 보이지</HeaderContainer>;
};

export default Header;
