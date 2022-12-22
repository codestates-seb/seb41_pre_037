import styled from "styled-components/macro"

const QuestionContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
  min-width: 400px;
  height: 120px;
  border: 1px solid #c5c5c5;
  border-width: ${props => props.isLast? '1px 0 1px 0' : '1px 0 0 0'};
  padding: 16px;
`

const QuestionRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
`

const QuestionLeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 15%;
  margin-right: 20px;
`
const QuestionInfo = styled.p`
  font-size: 15px;
  margin: 0;
  margin-bottom: 8px;
  color: ${props => props.isVote ? `black` : `gray`};
`

const QuestionTitle = styled.a`
  font-size: large;
  font-weight: 500;
  color: #0074cc;
  &:hover {
    color: #49a5f0;
    cursor: pointer;
  }
`
const QuestionPreview = styled.div`
  display: flex;
  font-size: 15px;
  margin-top: 10px;
`

const QuestionFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`

const Tag = styled.div`
  width: max-content;
  padding: 5px 8px;
  height: 15px;
  border: 1px #E1ECf4;
  border-radius: 5px;
  background-color: #E1ECF4;
  color: #39739D;
  font-size: small;
`

const Profile = styled.div`
  display: flex;
  width: max-content;
  height: max-content;
`

const ProfileImg = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  padding-bottom: 5px;
  margin-right: 5px;
`
const ProfileName = styled.a`
    padding-top: 2px;
    font-size: small;
    color: #39739D;
    text-decoration: none;
    margin-right: 5px;
`
const ProfileLog = styled.p`
  font-size: small;
  padding-top: 2px;
  margin: 0;
  color: #4c4c4c;
`

export default function Question({isLast}) {
  return (
    <QuestionContainer isLast={isLast}>
      <QuestionLeftSideContainer>
        <QuestionInfo isVote={true}>0 votes</QuestionInfo>
        <QuestionInfo isVote={false}>0 answers</QuestionInfo>
        <QuestionInfo isVote={false}>0 votes</QuestionInfo>
      </QuestionLeftSideContainer>
      <QuestionRightSideContainer>
        <QuestionTitle>What is Graphdriver of Docker?</QuestionTitle>
        <QuestionPreview>I couldn't find a newest information about built in graphdriver of docker. Not plugin. I could only find Michael Crosby's blog, written on Nov 16, 2017. I want more detailed information. My ...</QuestionPreview>
        <QuestionFooter>
          <Tag>docker</Tag>
          <Profile>
            <ProfileImg><img css={`border-radius: 5px;`} alt="img" src="https://lh3.googleusercontent.com/a/AEdFTp4KuAxaIP9SXvUCyy4wiVwwcDbXJJogWJGjyV3j=k-s32"></img></ProfileImg>
            <ProfileName>김근영</ProfileName>
            <ProfileLog>asked 1 min ago</ProfileLog>
          </Profile>
        </QuestionFooter>
      </QuestionRightSideContainer>
    </QuestionContainer>
  )
}
