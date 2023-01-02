// 페이지, 리액트 컴포넌트, 정적파일 
import Pagination from "../Pagination/Pagination";
import Question from "./Question";

//로컬 모듈
import BREAKPOINT from "../../breakpoint";

// 라이브러리 및 라이브러리 메소드
import { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)

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

const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  margin-left: 20px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: x-large;
    margin-left: 15px;
  }
`;

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
    background-color: #b2b2b2;
    color: #3a3a3a;
  }

  &:hover {
    background-color: #a2a2a2;
    cursor: pointer;
  }

`;

const PaginationContainer = styled.div`
  margin-left: 20px;
`;


// Main Component
export default function MainComponent() {
  // React States
  const [currentTab, setCurrentTab] = useState("Newest");
  const [pageInfo, setPageInfo] = useState();
  const [questionData, setQuestionData] = useState();
  
  // Other Hooks
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Variables & Methods
  const page = searchParams.get("page");

  // useEffect (페이지 리로드 시 페이지 탑으로 이동)
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [questionData]);

  // Ajax function (Axios)
  const fetchQuestion = () => {
    if (currentTab === "Unanswered") {
      if (!!page) {
        return axios.get(`${process.env.REACT_APP_SERVER_URI}questions?tab=${currentTab}&page=${page}`);
      } else {
        return axios.get(`${process.env.REACT_APP_SERVER_URI}questions?tab=${currentTab}`);
      }
    }

    if (!!page) {
      return axios.get(`${process.env.REACT_APP_SERVER_URI}questions?page=${page}`);
    } else {
      return axios.get(`${process.env.REACT_APP_SERVER_URI}questions`);
    }
  };

  // Ajax OnSuccess
  const fetchQuestionOnSuccess = (response) => {
    setQuestionData(response.data.data);
    setPageInfo(response.data.pageInfo);
  };

  // Ajax Tanstack Query
  const { isLoading, refetch } = useQuery({
    queryKey: ["fetchQuestion", page, currentTab],
    queryFn: fetchQuestion,
    keepPreviousData: true,
    onSuccess: fetchQuestionOnSuccess,
  });

  // Event Handlers
  const sortButtonOnClickHandler = (e) => {
    setCurrentTab(e.target.value);
  };

  return (
    <MainbarContainer>
      <MainbarTopHeader>
        <Title>All Questions</Title>
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
          <SortButton className={currentTab === "Newest" ? "selected" : ""} isLeft={true} onClick={sortButtonOnClickHandler} value={"Newest"}>
            Newest
          </SortButton>
          <SortButton className={currentTab === "Unanswered" ? "selected" : ""} isLeft={false} onClick={sortButtonOnClickHandler} value={"Unanswered"}>
            Unanswered
          </SortButton>
        </MainbarSortButtonContainer>
      </MainbarBottomHeader>
      {isLoading 
        ? <div>Loading....</div>
        : questionData?.map((question, index, questions) => {
        if (index === questions.length - 1) {
          return <Question data={question} isLast={true} key={question.questionId} />
        }
        return <Question data={question} key={question.questionId} />
      })}
      <PaginationContainer>
        {pageInfo && <Pagination pageinfo={pageInfo} setPage={setSearchParams} refetch={refetch}/>}
      </PaginationContainer>
    </MainbarContainer>
  );
}
