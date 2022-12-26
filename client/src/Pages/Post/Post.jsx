import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import Header from "../../Components/Header/Header";
import LeftNav from "../../Components/LeftNav/LeftNav";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import Footer from "../../Components/Footer/Footer";
import Question from "./Question";
import PostAnswer from "./PostAnswer";
import AnswerList from "./AnswerList";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  max-width: 1260px;
  margin: 0 auto;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    justify-content: flex-start;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-width: 500px;
  padding: 24px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    width: 100%;
    min-width: 0;
  }
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-height: 80px;
  max-height: max-content;
  border-bottom: 1px solid #e3e3e3;
`;

const PostHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const PostHeaderBottom = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.h1`
  all: unset;
  font-weight: 400;
  font-size: 28px;
  margin-bottom: 10px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: x-large;
  }
`;

const AskQuestionButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: #0a95ff;
  color: white;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;

  &:hover {
    background-color: #306fa0;
    color: #aeaeae;
    border: 1px solid #306fa0;
    box-shadow: inset 0 1px 0 0 #65869e;
    cursor: pointer;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    margin-right: 10px;
  }
`;

const PostContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: calc(100% - 300px);
  padding-top: 16px;
  box-sizing: border-box;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    width: 100%;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 100%;
  }
`;

const RightSidebarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 300px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    display: none;
  }
`;

export default function Post() {
  return (
    <>
      <Header />
      <Container>
        <LeftNav />
        <InnerContainer>
          <PostHeader>
            <PostHeaderTop>
              <Title>Why my netlify function return an error and doesn't fetch data </Title>
              <AskQuestionButton>Ask Questions</AskQuestionButton>
            </PostHeaderTop>
            <PostHeaderBottom>
              <span
                css={`
                  color: #525960;
                  margin-right: 7px;
                `}
              >
                Asked
              </span>
              <span>today</span>
            </PostHeaderBottom>
          </PostHeader>
          <div
            css={`
              display: flex;
            `}
          >
            <PostContentContainer>
              <Question />
              <AnswerList />
              <PostAnswer />
            </PostContentContainer>
            <RightSidebarContainer>
              <RightSidebar />
            </RightSidebarContainer>
          </div>
        </InnerContainer>
      </Container>
      <Footer />
    </>
  );
}