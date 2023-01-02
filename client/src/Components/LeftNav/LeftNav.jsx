import NavComponent from "./NavComponent";
import BREAKPOINT from "../../breakpoint";
import styled from "styled-components/macro";

const Container = styled.div`
  border-right: 1px solid rgb(181, 181, 181);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding-top: 24px;
  position: sticky;
  width: 164px;
  z-index: 1;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: none;
  }
`;

const LeftNav = () => {
  return (
    <Container>
      <NavComponent />
    </Container>
  );
};

export default LeftNav;
