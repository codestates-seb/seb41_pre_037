import styled from "styled-components/macro"
import PageButton from "./PageButton"

const PaginationContainer = styled.div`
  display: flex;
  width: max-content;
  height: max-content;
  margin-top: 50px;
`

const PagePrevButton = styled.button`
  padding : 4px 7px;
  border: 1px solid #c3c3c3;
  border-radius: 2px;
  background-color: white;
  margin: 0 10px;
  color: #3b4045;
  display: ${props => props.isFirst ? 'none' : ''};

  &:hover {
    cursor: pointer;
    background-color: #b2b2b2;
  }
`

const PageNextButton = styled.button`
  padding : 4px 7px;
  border: 1px solid #c3c3c3;
  border-radius: 2px;
  background-color: white;
  margin: 0 10px;
  color: #3b4045;
  display: ${props => props.isLast ? 'none' : 'flex'};

  &:hover {
    cursor: pointer;
    background-color: #b2b2b2;
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

export default function Pagination({pageinfo, setPage, refetch}) {
  const currentPage = pageinfo.page;

 
  if(currentPage > pageinfo.totalPages - 5 && pageinfo.totalPages - 5 > 0) {
    return (
      <PaginationContainer>
        <PagePrevButton isFirst={currentPage === 1}>Prev</PagePrevButton>
        <FirstPageSkipperGroup isFirst={currentPage === 1}>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} hidden={true} number={1}/>
          <p css={`margin: 0 2px;`}>...</p>
        </FirstPageSkipperGroup>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages - 4}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages - 3}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages - 2}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages - 1}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages}/>
        <LastPageSkipperGroup isHidden={currentPage > pageinfo.totalPages - 5}>
          <p css={`margin: 0 2px;`}>...</p>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages}/>
        </LastPageSkipperGroup>
        <PageNextButton isLast={currentPage === pageinfo.totalPages}>Next</PageNextButton>
      </PaginationContainer>
    )
  }

  else if(currentPage >= 5) {
    const pageNumArr = new Array(pageinfo.totalPages).map((num) => {});


    return (
      <PaginationContainer>
        <PagePrevButton>Prev</PagePrevButton>
        <FirstPageSkipperGroup>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} hidden={true} number={1}/>
          <p css={`margin: 0 2px;`}>...</p>
        </FirstPageSkipperGroup>
        {
          pageNumArr.map((page) => {
            return <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage}/>
          })
        }
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage - 2}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage - 1}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage + 1}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage + 2}/>
        <LastPageSkipperGroup>
          <p css={`margin: 0 2px;`}>...</p>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages}/>
        </LastPageSkipperGroup>
        <PageNextButton>Next</PageNextButton>
      </PaginationContainer>
    )
  }
  
  else {
    return (
      <PaginationContainer>
        <PagePrevButton isFirst={currentPage === 1}>Prev</PagePrevButton>
        <FirstPageSkipperGroup isFirst={currentPage === 1}>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} hidden={true} number={1}/>
          <p css={`margin: 0 2px;`}>...</p>
        </FirstPageSkipperGroup>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage + 1}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage + 2}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage + 3}/>
        <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={currentPage + 4}/>
        <LastPageSkipperGroup isLast={currentPage === pageinfo.totalPages}>
          <p css={`margin: 0 2px;`}>...</p>
          <PageButton refetch={refetch} setPage={setPage} currentPage={currentPage} number={pageinfo.totalPages}/>
        </LastPageSkipperGroup>
        <PageNextButton isLast={currentPage === pageinfo.totalPages}>Next</PageNextButton>
      </PaginationContainer>
    )
  }

}