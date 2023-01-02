//로컬 모듈
import BREAKPOINT from "../../breakpoint";
import dateCalc from "../../utils/dateCalc";

// 라이브러리 및 라이브러리 메소드
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import { convert } from "html-to-text";

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const QuestionContainer = styled.div`
  border: 1px solid #c5c5c5;
  border-width: ${(props) => (props.isLast ? "1px 0 1px 0" : "1px 0 0 0")};
  display: flex;
  float: right;
  height: max-content;
  max-width: 900px;
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
  align-items: end;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  width: 15%;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    flex-direction: row;
    width: 95%;
  }
`;

const QuestionInfo = styled.p`
  color: ${(props) => (props.isVote ? `black` : `gray`)};
  font-size: 13px;
  margin: 0;
  margin-bottom: 8px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    font-size: small;
    margin-right: 10px;
    margin-bottom: 3px;
  }
`;

const QuestionTitle = styled.a`
  color: #0074cc;
  font-size: large;
  font-weight: 500;

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
  text-overflow: ellipsis;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: small;
  }
`;

const QuestionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: stretch;
  margin-top: 7px;
  width: 100%;
`;

const Tag = styled.div`
  background-color: #e1ecf4;
  border: 1px #e1ecf4;
  border-radius: 5px;
  color: #39739d;
  font-size: small;
  height: 15px;
  margin-right: 5px;
  padding: 5px 8px;
  width: max-content;
`;

const Profile = styled.div`
  display: flex;
  height: max-content;
  margin-left: auto;
`;

const ProfileImg = styled.div`
  display: flex;
  height: 15px;
  padding-bottom: 5px;
  margin-right: 5px;
  width: 15px;
`;

const ProfileName = styled.a`
  color: #39739d;
  font-size: small;
  padding-top: 2px;
  margin-right: 5px;
  text-decoration: none;
`;

const ProfileLog = styled.p`
  color: #4c4c4c;
  font-size: small;
  margin: 0;
  padding-top: 2px;
`;

// Main Component
export default function Question({ data, isLast }) {
  // Other Hooks
  const navigate = useNavigate();

  // Variables & Methods
  const date = dateCalc(data.questionCreatedAt);

  return (
    <QuestionContainer isLast={isLast}>
      <QuestionLeftSideContainer>
        <QuestionInfo isVote={true}>{`${data.questionVoteCount} votes`}</QuestionInfo>
        <QuestionInfo isVote={false}>{`${data.questionAnswerCount} answers`}</QuestionInfo>
        <QuestionInfo isVote={false}>{`${data.questionViewCount} views`}</QuestionInfo>
      </QuestionLeftSideContainer>
      <QuestionRightSideContainer>
        <QuestionTitle onClick={() => { navigate(`/post/${data.questionId}/${data.questionTitle.replaceAll(" ", "-")}`) }}>
          {`${data.questionTitle}`}
        </QuestionTitle>
        <QuestionPreview>
          {convert(data.questionProblemBody, { wordwrap: 130 })}
        </QuestionPreview>
        <QuestionFooter>
          {data.tags.map((tag) => {
            return <Tag key={tag.tagId}>{tag.tagName}</Tag>;
          })}
          <Profile>
            <ProfileImg>
              <img css={`border-radius: 5px;`} alt="img" src={data.image}></img>
            </ProfileImg>
            <ProfileName>
              {`${data.username}`}
            </ProfileName>
            <ProfileLog>
              {`asked ${date}`}
            </ProfileLog>
          </Profile>
        </QuestionFooter>
      </QuestionRightSideContainer>
    </QuestionContainer>
  );
}
