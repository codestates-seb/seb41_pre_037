import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";

const Container = styled.div`
  width: 164px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(181, 181, 181);

  z-index: 1;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const StickyLeftNavContainer = styled.nav`
  width: 164px;
  height: 160px;
  position: sticky;
  top: 50px;
  z-index: 1;
  background-color: powderblue;
`;

const LeftNavMenuContainer = styled.ul`
  margin-top: 24px;
  width: 164px;
`;

const LeftNavMenu = styled.li`
  width: 164px;
  height: 34px;
`;

const LeftNav = () => {
  return (
    <Container>
      <StickyLeftNavContainer>
        <LeftNavMenuContainer>
          <LeftNavMenu>Home</LeftNavMenu>
          <LeftNavMenu>Public</LeftNavMenu>
          <LeftNavMenu>Tags</LeftNavMenu>
          <LeftNavMenu>Users</LeftNavMenu>
        </LeftNavMenuContainer>
      </StickyLeftNavContainer>
    </Container>
  );
};

export default LeftNav;
