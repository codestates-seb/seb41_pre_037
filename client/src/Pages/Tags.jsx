// 페이지, 리액트 컴포넌트, 정적파일 
import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import LeftNav from "../Components/LeftNav/LeftNav"
import Pagination from "../Components/Pagination/Pagination"
import Tag from "../Components/Tag/Tag"

// 로컬 모듈
import BREAKPOINT from "../breakpoint";

// 라이브러리 및 라이브러리 메소드
import { useState,  useEffect } from "react"
import styled from "styled-components/macro"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const Container = styled.div`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
  height: max-content;
  margin: 0 auto;
  max-width: 1260px;
  width: 100%;
`;

const MainbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  margin-bottom: 50px;
  width: 100%;
`;

const MainbarTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 100%;
`;

const MainbarTitle = styled.h1`
  font-size: 28px;
  font-weight: 400;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: 24px;
  }
`;

const MainbarTitleDetail = styled.p`
  font-size: 16px;
  margin: 0;
  margin-bottom: 10px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: 14px;
  }
`;

const MainbarTagsContainer = styled.ul`
  column-gap: 10px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  justify-content: space-between;
  list-style: none;
  margin: 0;
  margin-top: 50px;
  padding: 0;
  row-gap: 10px;
  width: 100%;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTAGSTHREE}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    margin-top: 30px;
  }
`;

const PaginationContainer = styled.div`
  align-self: flex-end;
`;

// Main Component
export default function Tags() {
  // React States
  const [tagsData, setTagsData] = useState('');
  const [pageInfo, setPageInfo] = useState('');

  // Other Hooks
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Variables & Methods
  const page = searchParams.get('page');

  // useEffect (페이지 리로드 시 페이지 탑으로 이동)
  useEffect(() => {
    window.scrollTo({left : 0, top: 0, behavior: "smooth"});
  }, [tagsData]);
  
  // Ajax function (Axios)
  const fetchTags = () => {
    if(!!page) {
      return axios.get(`${process.env.REACT_APP_SERVER_URI}tags?page=${page}`);
    } 
    else {
      return axios.get(`${process.env.REACT_APP_SERVER_URI}tags`);
    }
  }

  // Ajax OnSuccess
  const fetchTagsOnSuccess = (response) => {
    setTagsData(response.data.data);
    setPageInfo(response.data.pageInfo);
  }

  // Ajax Tanstack Query
  const {isLoading, refetch} = useQuery({
    queryKey: ['fetchTags', page], 
    queryFn: fetchTags, 
    keepPreviousData: true, 
    onSuccess: fetchTagsOnSuccess});

  return (
    <>
    <Header/>
    <Container>
      <LeftNav/>
      <MainbarContainer>
        <MainbarTitleContainer>
          <MainbarTitle>Tags</MainbarTitle>
          <MainbarTitleDetail>A tag is a keyword or label that categorizes your question with other, similar questions. <br/>Using the right tags makes it easier for others to find and answer your question.</MainbarTitleDetail>
        </MainbarTitleContainer>
        <MainbarTagsContainer>
          {isLoading 
          ? <div>Loading...</div> 
          : tagsData && tagsData.map((tag) => {
            return <Tag data={tag} key={tag.tagId}/>
          })
        }
        </MainbarTagsContainer>
        <PaginationContainer>
          <Pagination pageinfo={pageInfo} setPage={setSearchParams} refetch={refetch}/>
        </PaginationContainer>
      </MainbarContainer>
    </Container>
    <Footer/>
    </>
  )
}
