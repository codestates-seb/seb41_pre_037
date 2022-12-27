import styled from "styled-components/macro"
import { useLocation, useNavigate } from "react-router-dom"

const Button = styled.button`
  padding : 4px 7px;
  border: 1px solid #c3c3c3;
  border-radius: 2px;
  background-color: white;
  color: #3b4045;
  margin: 0 2px;
  display: ${props => props.isNull ? 'flex' : 'none'};
  
  &:hover {
    cursor: pointer;
    background-color: #cdcdcd;
  }

  &.current {
    background-color: #f69000;
    border: 0;
    color: white;
  }
`

export default function PageButton({number, currentPage, setPage, refetch}) {
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
