import styled from "styled-components/macro"

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

export default function PageButton({number, currentPage}) {
  console.log('pages', number === currentPage);

  return (
    <Button isNull={!!number} className={number === currentPage && "current" }>
      {number}
    </Button>
  )
}
