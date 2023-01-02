// 페이지, 리액트 컴포넌트, 정적파일 
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import LeftNav from "../Components/LeftNav/LeftNav";
import Pagination from "../Components/Pagination/Pagination";
import Question from "../Components/Main/Question";
import RightSidebar from "../Components/RightSidebar/RightSidebar";

//로컬 모듈
import BREAKPOINT from "../breakpoint";

// 라이브러리 및 라이브러리 메소드
import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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

const MainbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  width: 70%;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    width: 100%;
  }
`;

const MainbarTopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
  
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    padding-right: 20px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  margin-left: 20px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: x-large;
    margin-left: 15px;
  }
`;

const SearchedInfo = styled.p`
  color: #7e7e7e;
  font-size: 14px;
  margin: 0;
  margin-left: 20px;
`

const AskQuestionButton = styled.button`
  background-color: #0a95ff;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;
  color: white;
  height: 35px;
  margin: auto 0;
  width: 100px;

  &:hover {
    background-color: #306fa0;
    border: 1px solid #306fa0;
    box-shadow: inset 0 1px 0 0 #65869e;
    color: #aeaeae;
    cursor: pointer;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    margin-right: 10px;
  }
`;

const MainbarBottomHeader = styled.div`
  align-items: end;
  display: flex;
  justify-content: space-between;
  width: 100%;
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

const MainbarSortButtonContainer = styled.div`
  display: flex;
  height: max-content;
  padding-bottom: 15px;
  width: 200px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    margin-right: 10px;
  }
`;

const SortButton = styled.button`
  border: 1px solid gray;
  border-radius: ${(props) => (props.isLeft ? "5px 0 0 5px" : "0 5px 5px 0")};
  border-width: ${(props) => (props.isLeft ? "1px 0 1px 1px" : "1px")};
  height: 30px;
  margin: 0;
  padding: 5px;
  width: 50%;

  &.selected {
    background-color: #777777;
    color: #3a3a3a;
  }

  &:hover {
    background-color: #a2a2a2;
    cursor: pointer;
  }

`;

const RightSidebarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 3%;
  min-width: 300px;
  width: 20%;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    display: none;
  }
`;

const PaginationContainer = styled.div`
  margin-left: 20px;
`;

// Main Component
export default function MainSearch() {
  // React States
  const [questionData, setQuestionData] = useState();
  const [pageInfo, setPageInfo] = useState();
  const [currentTab, setCurrentTab] = useState('Newest');
  
  // Other Hooks
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Variables & Methods
  const page = searchParams.get("page");
  const query = searchParams.get("q");

  // useEffect (페이지 리로드 시 페이지 탑으로 이동)
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [questionData]);

  // Ajax function (Axios)
  const fetchSearchedQuestion = () => {
    if(currentTab === 'Unanswered') {
      if(!!page) {
        return axios.get(`${process.env.REACT_APP_SERVER_URI}questions?tab=${currentTab}&page=${page}`);
      }
      else {
        return axios.get(`${process.env.REACT_APP_SERVER_URI}questions?tab=${currentTab}`);
      }
    } 

    if (!!page) {
      return axios.get(`${process.env.REACT_APP_SERVER_URI}questions/search?q=${query}&page=${page}`);
    } else {
      return axios.get(`${process.env.REACT_APP_SERVER_URI}questions/search?q=${query}`);
    }
  };

  // Ajax OnSuccess
  const fetchSearchedQuestionOnSuccess = (response) => {
    setQuestionData(response.data.data);
    setPageInfo(response.data.pageInfo);
  };

  // Ajax Tanstack Query
  const { isLoading, refetch } = useQuery({
    queryKey: ["fetchSearchedQuestion", query, currentTab],
    queryFn: fetchSearchedQuestion,
    keepPreviousData: true,
    onSuccess: fetchSearchedQuestionOnSuccess,
  });

  // Event Handlers
  const sortButtonClickHandler = e => {
    setCurrentTab(e.target.value);
  } 

  return (
    <>
      <Header />
      <Container>
        <LeftNav />
        {isLoading 
        ? <div>Loading....</div>
        : (
          <MainbarContainer>
            <MainbarTopHeader>
              <TitleContainer>
                <Title>Searched Questions</Title>
                <SearchedInfo>{`Results for ${query}`}</SearchedInfo>
              </TitleContainer>
              <AskQuestionButton onClick={() => {navigate("/askquestions")}}>
                Ask Questions
              </AskQuestionButton>
            </MainbarTopHeader>
            <MainbarBottomHeader>
              {pageInfo 
              ? <QuestionCount>{`${pageInfo?.totalElements} questions`}</QuestionCount>
              : <p css={`margin-left: 20px;`}> loading...</p>
              }
              <MainbarSortButtonContainer>
                <SortButton className={currentTab === 'Newest' ? 'selected' : ''} isLeft={true} onClick={sortButtonClickHandler} value={'Newest'}>
                  Newest
                </SortButton>
                <SortButton className={currentTab === 'Unanswered' ? 'selected' : ''} isLeft={false} onClick={sortButtonClickHandler} value={'Unanswered'}>
                  Unanswered
                </SortButton>
              </MainbarSortButtonContainer>
            </MainbarBottomHeader>
            {questionData?.map((question, index, questions) => {
              if (index === questions.length - 1) {
                return <Question data={question} isLast={true} key={question.questionId}/>;
              }
              return <Question data={question} key={question.questionId} />;
            })}
            <PaginationContainer>
              {pageInfo && <Pagination pageinfo={pageInfo} refetch={refetch} setPage={setSearchParams} />}
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
