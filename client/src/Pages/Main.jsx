import RightSidebar from "../Components/RightSidebar/RightSidebar";
import styled from "styled-components/macro";
import Question from "../Components/Main/Question";
import BREAKPOINT from "../breakpoint";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import LeftNav from "../Components/LeftNav/LeftNav";
import Pagination from "../Components/Pagination/Pagination";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

const Title = styled.h1`
  font-weight: 400;
  margin-left: 20px;
  font-size: 28px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: x-large;
    margin-left: 15px;
  }
`;

const QuestionCount = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-left: 20px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: medium;
    margin-left: 15px;
  }
`;

const MainbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-bottom: 50px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    width: 100%;
  }
`;
const MainbarTopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    padding-right: 20px;
  }
`;

const MainbarBottomHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const MainbarSortButtonContainer = styled.div`
  display: flex;
  width: 200px;
  height: max-content;
  padding-bottom: 15px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    margin-right: 10px;
  }
`;

const SortButton = styled.button`
  width: 50%;
  height: 30px;
  padding: 5px;
  margin: 0;
  border: 1px solid gray;
  border-radius: ${(props) => (props.isLeft ? "5px 0 0 5px" : "0 5px 5px 0")};
  border-width: ${(props) => (props.isLeft ? "1px 0 1px 1px" : "1px")};

  &:hover {
    background-color: #a2a2a2;
    cursor: pointer;
  }

  &.selected {
    background-color: #777777;
    color: #3a3a3a;
  }
`;

const AskQuestionButton = styled.button`
  margin: auto 0;
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

const PaginationContainer = styled.div`
  margin-left: 20px;
`;

export default function Main() {
  const navigate = useNavigate();

  const [questionData, setQuestionData] = useState();
  const [pageInfo, setPageInfo] = useState();
  const [currentTab, setCurrentTab] = useState('Newest');


  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [questionData]);

  const fetchQuestion = () => {
    console.log(page, currentTab);

    if(currentTab === 'Unanswered') {
      if(!!page) {
        console.log('page and tab')
        return axios.get(`${process.env.REACT_APP_SERVER_URI}questions?tab=${currentTab}&page=${page}`);
      }
      else {
        console.log('no page and tab')
        return axios.get(`${process.env.REACT_APP_SERVER_URI}questions?tab=${currentTab}`);
      }
    } 

    if(!!page) {
      return axios.get(`${process.env.REACT_APP_SERVER_URI}questions?page=${page}`);
    } 
    else {
      return axios.get(`${process.env.REACT_APP_SERVER_URI}questions`);
    }
  };


  const fetchQuestionOnSuccess = (response) => {
    setQuestionData(response.data.data);
    setPageInfo(response.data.pageInfo);
  };

  const { isLoading, refetch } = useQuery({
    queryKey: ["fetchQuestion", page, currentTab],
    queryFn: fetchQuestion,
    keepPreviousData: true,
    onSuccess: fetchQuestionOnSuccess,
  });


  const sortButtonClickHandler = e => {
    setCurrentTab(e.target.value);
  } 

  return (
    <>
      <Header />
      <Container>
        <LeftNav />
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <MainbarContainer>
            <MainbarTopHeader>
              <Title>All Questions</Title>
              <AskQuestionButton
                onClick={() => {
                  navigate("/askquestions");
                }}
              >
                Ask Questions
              </AskQuestionButton>
            </MainbarTopHeader>
            <MainbarBottomHeader>
              {pageInfo ? (
                <QuestionCount>{`${pageInfo?.totalElements} questions`}</QuestionCount>
              ) : (
                <p
                  css={`
                    margin-left: 20px;
                  `}
                >
                  loading...
                </p>
              )}
              <MainbarSortButtonContainer>
                <SortButton className={currentTab === 'Newest' ? 'selected' : ''} value={'Newest'} isLeft={true} onClick={sortButtonClickHandler}>Newest</SortButton>
                <SortButton className={currentTab === 'Unanswered' ? 'selected' : ''} value={'Unanswered'} isLeft={false} onClick={sortButtonClickHandler}>Unanswered</SortButton>
              </MainbarSortButtonContainer>
            </MainbarBottomHeader>
            {questionData?.map((question, index, questions) => {
              if (index === questions.length - 1) {
                return <Question data={question} isLast={true} key={question.questionId} />;
              }
              return <Question data={question} key={question.questionId} />;
            })}
            <PaginationContainer>
              {pageInfo && <Pagination pageinfo={pageInfo} setPage={setSearchParams} refetch={refetch} />}
            </PaginationContainer>
          </MainbarContainer>
        )}
        <RightSidebarContainer>
          <RightSidebar />
        </RightSidebarContainer>
      </Container>
      <Footer />
    </>
  );
}
