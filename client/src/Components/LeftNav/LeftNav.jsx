import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import NavComponent from "./NavComponent";

const Container = styled.div`
  width: 164px;
  padding-top: 24px;
  min-height: 100%;
  display: flex;
  position: sticky;
  flex-direction: column;
  border-right: 1px solid rgb(181, 181, 181);

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
