import RightSidebar from "../Components/RightSidebar/RightSidebar"
import styled from "styled-components/macro"
import Question from "../Components/Main/Question"
import BREAKPOINT from "../breakpoint"

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: max-content;
`

const Title = styled.h1`
  font-weight: 400; 
  margin-left: 10px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: x-large;
  }
`

const QuestionCount = styled.h2`
  font-size: 18px; 
  font-weight: 500; 
  margin-left: 15px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: medium;
  }
`

const MainbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  min-width: 500px;
  max-width: 800px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    width: 90%;
    min-width: 0;
  }
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

  &:hover {
    background-color: #306fa0;
    color: #aeaeae;
    border: 1px solid #306fa0;
    box-shadow: inset 0 1px 0 0 #65869e;
    cursor: pointer;
  }
`

const RightSidebarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  margin-left: 50px;
  min-width: 400px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    display: none;
  }
`

export default function Main() {
  return (
    <Container>
      <MainbarContainer>
        <MainbarTopHeader>
        <Title>All Questions</Title>
        <AskQuestionButton>Ask Questions</AskQuestionButton>
        </MainbarTopHeader>
        <MainbarBottomHeader>
        <QuestionCount>2,400,239 questions</QuestionCount>
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
