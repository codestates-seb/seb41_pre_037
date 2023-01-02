// 페이지, 리액트 컴포넌트, 정적파일 
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import LeftNav from "../Components/LeftNav/LeftNav";
import RightSidebar from "../Components/RightSidebar/RightSidebar";
import MainComponent from "../Components/Main/MainComponent";

//로컬 모듈
import BREAKPOINT from "../breakpoint";

// 라이브러리 및 라이브러리 메소드
import { useEffect } from "react";
import styled from "styled-components/macro";

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const Container = styled.div`
  display: flex;
  height: max-content;
  margin: 0 auto;
  max-width: 1260px;
  width: 100%;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    justify-content: flex-start;
  }
`;

const RightSidebarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 3%;
  width: 20%;
  min-width: 300px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    display: none;
  }
`;

// Main Component
export default function Main() {

  // useEffect (페이지 리로드 시 페이지 탑으로 이동)
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <LeftNav />
          <MainComponent/>
        <RightSidebarContainer>
          <RightSidebar />
        </RightSidebarContainer>
      </Container>
      <Footer />
    </>
  );
}
