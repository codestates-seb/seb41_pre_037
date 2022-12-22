import RightSidebar from "../Components/RightSidebar/RightSidebar"
import styled from "styled-components/macro"
import Question from "../Components/Main/Question"

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: max-content;
`

const MainbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  min-width: 500px;
  max-width: 800px;
`
const MainbarTopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const MainbarBottomHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;
`

const MainbarSortButtonContainer = styled.div`
  display: flex;
  width: 200px;
  height: max-content;
  padding-bottom: 15px;
`

const SortButton = styled.button`
  width: 50%;
  height : 30px;
  padding: 5px;
  margin: 0;
  border: 1px solid gray;
  border-radius: ${props => props.isLeft? '5px 0 0 5px' : '0 5px 5px 0'};
  border-width: ${props => props.isLeft? '1px 0 1px 1px' : '1px'};

  &:hover {
    background-color: #e8e8e8;
    cursor: pointer;
  }
`

const AskQuestionButton = styled.button`
  margin: auto 0;
  width: 100px;
  height: 35px;
  background-color: #0a95ff;
  color: white;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;
`

const RightSidebarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  margin-left: 50px;
  min-width: 400px;
`

export default function Main() {
  return (
    <Container>
      <MainbarContainer>
        <MainbarTopHeader>
        <h1 css={`font-weight: 400; margin-left: 10px;`}>All Questions</h1>
        <AskQuestionButton>Ask Questions</AskQuestionButton>
        </MainbarTopHeader>
        <MainbarBottomHeader>
        <h2 css={`font-size: 18px; font-weight: 500; margin-left: 15px;`}>2,400,239 questions</h2>
        <MainbarSortButtonContainer>
          <SortButton isLeft={true}>Latest</SortButton>
          <SortButton isLeft={false}>Unanswered</SortButton>
        </MainbarSortButtonContainer>
        </MainbarBottomHeader>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question/>
        <Question isLast={true}/>
      </MainbarContainer>
      <RightSidebarContainer>
        <RightSidebar/>
      </RightSidebarContainer>
    </Container>
  )
}
