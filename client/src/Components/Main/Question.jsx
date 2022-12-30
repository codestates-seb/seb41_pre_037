import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import { useNavigate } from "react-router-dom";
import { convert } from 'html-to-text';

const QuestionContainer = styled.div`
  display: flex;
  max-width: 900px;
  float: right;
  height: max-content;
  border: 1px solid #c5c5c5;
  border-width: ${(props) => (props.isLast ? "1px 0 1px 0" : "1px 0 0 0")};
  padding: 16px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    flex-direction: column;
  }
`;

const QuestionRightSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    width: 95%;
  }
`;

const QuestionLeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  width: 15%;
  margin-right: 20px;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    width: 95%;
    flex-direction: row;
  }
`;
const QuestionInfo = styled.p`
  font-size: 13px;
  margin: 0;
  margin-bottom: 8px;
  color: ${(props) => (props.isVote ? `black` : `gray`)};
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    margin-right: 10px;
    margin-bottom: 3px;
    font-size: small;
  }
`;

const QuestionTitle = styled.a`
  font-size: large;
  font-weight: 500;
  color: #0074cc;
  &:hover {
    color: #49a5f0;
    cursor: pointer;
  }
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: medium;
  }
`;
const QuestionPreview = styled.div`
  display: flex;
  font-size: 15px;
  margin-top: 10px;
  /* min-width: 420px; */
  text-overflow: ellipsis;
  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: small;
  }
`;

const QuestionFooter = styled.div`
  display: flex;
  width: 100%;
  justify-items: stretch;
  justify-content: space-between;
  margin-top: 7px;
`;

const Tag = styled.div`
  width: max-content;
  padding: 5px 8px;
  height: 15px;
  border: 1px #e1ecf4;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #39739d;
  font-size: small;
  margin-right: 5px;
`;

const Profile = styled.div`
  display: flex;
  height: max-content;
  margin-left: auto;
`;

const ProfileImg = styled.div`
  display: flex;
  width: 15px;
  height: 15px;
  padding-bottom: 5px;
  margin-right: 5px;
`;
const ProfileName = styled.a`
  padding-top: 2px;
  font-size: small;
  color: #39739d;
  text-decoration: none;
  margin-right: 5px;
`;
const ProfileLog = styled.p`
  font-size: small;
  padding-top: 2px;
  margin: 0;
  color: #4c4c4c;
`;

export default function Question({ data, isLast }) {
  const navigate = useNavigate();

  const dateCalc = () => {
    const now = new Date(Date.now());
    const createdAt = new Date(data.questionCreatedAt);
    const timeDiff = new Date(now - createdAt);
    if (timeDiff.getDate() >= 365) {
      return `asked ${Math.floor(timeDiff.getDate() / 365)} years ago`;
    } else if (timeDiff.getDate() > 1) {
      return `asked ${timeDiff.getDate()} days ago`;
    } else {
      return `asked ${timeDiff.getHours()} hours ago`;
    }
  };

  return (
    <QuestionContainer isLast={isLast}>
      <QuestionLeftSideContainer>
        <QuestionInfo isVote={true}>{`${data.questionVoteCount} votes`}</QuestionInfo>
        <QuestionInfo isVote={false}>{`${data.questionAnswerCount} answers`}</QuestionInfo>
        <QuestionInfo isVote={false}>{`${data.questionViewCount} views`}</QuestionInfo>
      </QuestionLeftSideContainer>
      <QuestionRightSideContainer>
        <QuestionTitle onClick={() => {navigate(`/post/${data.questionId}/${data.questionTitle.replaceAll(' ', '-')}`)}}>{`${data.questionTitle}`}</QuestionTitle>
        <QuestionPreview>{convert(data.questionProblemBody, {wordwrap: 130})}</QuestionPreview>
        <QuestionFooter>
          {data.tags.map((tag) => {
            return <Tag key={tag.tagId}>{tag.tagName}</Tag>;
          })}
          <Profile>
            <ProfileImg>
              <img
                css={`
                  border-radius: 5px;
                `}
                alt="img"
                src={data.image}
              ></img>
            </ProfileImg>
            <ProfileName>{`${data.username}`}</ProfileName>
            <ProfileLog>{dateCalc()}</ProfileLog>
          </Profile>
        </QuestionFooter>
      </QuestionRightSideContainer>
    </QuestionContainer>
  );
}
