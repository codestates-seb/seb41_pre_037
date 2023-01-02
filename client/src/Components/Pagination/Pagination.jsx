// 페이지, 리액트 컴포넌트, 정적파일 
import PageButton from "./PageButton"

// 라이브러리 및 라이브러리 메소드
import styled from "styled-components/macro"

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const PaginationContainer = styled.div`
  display: flex;
  height: max-content;
  margin-top: 50px;
  width: max-content;
`

const PagePrevButton = styled.button`
  background-color: white;
  border: 1px solid #c3c3c3;
  border-radius: 2px;
  color: #3b4045;
  display: ${props => props.isFirst ? 'none' : ''};
  margin: 0 10px;
  padding : 4px 7px;

  &:hover {
    background-color: #b2b2b2;
    cursor: pointer;
  }
`

const PageNextButton = styled.button`
  background-color: white;
  border: 1px solid #c3c3c3;
  border-radius: 2px;
  color: #3b4045;
  display: ${props => props.isLast ? 'none' : 'flex'};
  margin: 0 10px;
  padding : 4px 7px;

  &:hover {
    background-color: #b2b2b2;
    cursor: pointer;
  }
`

const FirstPageSkipperGroup = styled.div`
  display: ${props => props.isFirst ? 'none' : 'flex'};
  width: max-content;
`

const LastPageSkipperGroup = styled.div`
  display: ${props => props.isHidden ? 'none' : 'flex'};
  width: max-content;
`
// Main Component
export default function Pagination({pageinfo, setPage, refetch}) {
  // Variables & Methods
  const currentPage = pageinfo.page;
  
  const pageMovebuttonOnClickHandler = (action) => {
    if(action === 'prev') {
      setPage({page : currentPage - 1});
      refetch();
    } 
    else if(action === 'next') {
      setPage({page : currentPage + 1});
      refetch();
    }
  }
  
  if(Math.floor(pageinfo.totalPages / currentPage) < 2 && pageinfo.totalPages > 5 && currentPage > 5) {
    const nearestFiveMultiple = Math.floor(pageinfo.totalPages / 5) * 5;
    const pageNumArr = new Array(pageinfo.totalPages - nearestFiveMultiple).fill(0).map((_, index) => {return index}).reverse();

    return (
      <PaginationContainer>
        <PagePrevButton isFirst={currentPage === 1} onClick={() => {pageMovebuttonOnClickHandler('prev')}}>Prev</PagePrevButton>
        <FirstPageSkipperGroup isFirst={currentPage === 1}>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} hidden={true} number={1}/>
          <p css={`margin: 0 2px;`}>...</p>
        </FirstPageSkipperGroup>
        {
          pageNumArr.map((page, index) => {return <PageButton key={index} refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages - page}/>})
        }
        <LastPageSkipperGroup isHidden={currentPage > pageinfo.totalPages - 5}>
          <p css={`margin: 0 2px;`}>...</p>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages}/>
        </LastPageSkipperGroup>
        <PageNextButton isLast={currentPage === pageinfo.totalPages} onClick={() => {pageMovebuttonOnClickHandler('next')}}>Next</PageNextButton>
      </PaginationContainer>
    )
  }

  else if(currentPage >= 5) {
    return (
      <PaginationContainer>
        <PagePrevButton onClick={() => {pageMovebuttonOnClickHandler('prev')}}>Prev</PagePrevButton>
        <FirstPageSkipperGroup>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} hidden={true} number={1}/>
          <p css={`margin: 0 2px;`}>...</p>
        </FirstPageSkipperGroup>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage - 2}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage - 1}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage + 1}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage + 2}/>
        <LastPageSkipperGroup>
          <p css={`margin: 0 2px;`}>...</p>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages}/>
        </LastPageSkipperGroup>
        <PageNextButton onClick={() => {pageMovebuttonOnClickHandler('next')}}>Next</PageNextButton>
      </PaginationContainer>
    )
  }
  
  else if (pageinfo.totalPages < 5) {
    const pageNumArr = new Array(pageinfo.totalPages).fill(0).map((_, index) => {return index + 1});

    return (
      <PaginationContainer>
        <PagePrevButton isFirst={currentPage === 1} onClick={() => {pageMovebuttonOnClickHandler('prev')}}>Prev</PagePrevButton>
        {
          pageNumArr.map((page, index) => {return <PageButton key={index} refetch={refetch} setPage={setPage} currentPage={currentPage} number={page}/>})
        }
        <PageNextButton isLast={currentPage === pageinfo.totalPages} onClick={() => {pageMovebuttonOnClickHandler('next')}}>Next</PageNextButton>
      </PaginationContainer>
    )
  }

  else {
    return (
      <PaginationContainer>
      <PagePrevButton isFirst={currentPage === 1} onClick={() => {pageMovebuttonOnClickHandler('prev')}}>Prev</PagePrevButton>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={1}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={2}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={3}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={4}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={5}/>
        <LastPageSkipperGroup>
          <p css={`margin: 0 2px;`}>...</p>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages}/>
        </LastPageSkipperGroup>
        <PageNextButton onClick={() => {pageMovebuttonOnClickHandler('next')}}>Next</PageNextButton>
      </PaginationContainer>
    )
  }
}
