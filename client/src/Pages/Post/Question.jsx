import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import ArrowUpIcon from "../../icons/ArrowUpLg.svg";
import ArrowDownIcon from "../../icons/ArrowDownLg.svg";

const PostTopContainer = styled.div`
  display: flex;
  width: 100%;
`;

const PostTopInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 52px);
`;

const VotingComponentConatiner = styled.div`
  display: flex;
  height: 100%;
  background-color: beige;
  margin-right: 16px;
`;

const VotingComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  background-color: darksalmon;
`;

const VotingButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VotingCounter = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  align-items: center;
  justify-content: center;
  font-size: large;
  color: #6a737c;
`;

const QuestionTopContainer = styled.div``;

const AuthorInfoContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #d9e9f7;
  padding: 7px;
  min-width: 200px;
  min-height: 65px;
`;

const AuthorProfileImageArea = styled.div`
  width: 32px;
  height: 32px;
  background-color: green;
`;

const AuthorProfileLinker = styled.a`
  all: unset;
  font-size: 14px;
  margin-left: 10px;
  color: #2880d1;
  cursor: pointer;

  &:hover {
    color: #4293f8;
  }
`;

const QuestionBottomContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 10px;
  justify-content: space-between;
`;

const ShareLinker = styled.a`
  color: #525960;

  &:hover {
    cursor: pointer;
    color: #7f8a95;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  height: max-content;
  padding: 20px 5px 20px 10px;
  background-color: darkorange;
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

export default function Question() {
  return (
    <PostTopContainer>
      <VotingComponentConatiner>
        <VotingComponent>
          <VotingButton>
            <img src={ArrowUpIcon} />
          </VotingButton>
          <VotingCounter>0</VotingCounter>
          <VotingButton>
            <img src={ArrowDownIcon} />
          </VotingButton>
        </VotingComponent>
      </VotingComponentConatiner>
      <PostTopInnerContainer>
        <QuestionTopContainer></QuestionTopContainer>
        <TagsContainer>
          <Tag>javascript</Tag>
          <Tag>fetch-api</Tag>
          <Tag>netlify</Tag>
          <Tag>api-key</Tag>
          <Tag>netlify-function</Tag>
        </TagsContainer>
        <QuestionBottomContainer>
          <ShareLinker>Share</ShareLinker>
          <AuthorInfoContainer>
            <AuthorProfileImageArea />
            <AuthorProfileLinker>joenpc npcsolution</AuthorProfileLinker>
          </AuthorInfoContainer>
        </QuestionBottomContainer>
      </PostTopInnerContainer>
    </PostTopContainer>
  );
}
