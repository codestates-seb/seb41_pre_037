// 라이브러리 및 라이브러리 메소드
import styled from "styled-components/macro"

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const Button = styled.button`
  background-color: white;
  border: 1px solid #c3c3c3;
  border-radius: 2px;
  color: #3b4045;
  display: ${props => props.isNull ? 'flex' : 'none'};
  margin: 0 2px;
  padding : 4px 7px;
  
  &.current {
    background-color: #f69000;
    border: 0;
    color: white;
  }

  &:hover {
    cursor: pointer;
    background-color: #cdcdcd;
  }
`;

// Main Component
export default function PageButton({number, currentPage, setPage, refetch}) {
  // Event Handlers
  const buttonOnClickHandler = () => {
    setPage({page : number});
    refetch();
  }

  return (
    <Button isNull={!!number} className={number === currentPage && "current" } onClick={buttonOnClickHandler}>
      {`${number}`}
    </Button>
  )
}
