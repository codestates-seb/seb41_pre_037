import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import ArrowUpIcon from "../../icons/ArrowUpLg.svg";
import ArrowDownIcon from "../../icons/ArrowDownLg.svg";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { defaultStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ShareSheet from "../../Components/Post/ShareSheet";
import { useShareSheetStore } from "../../store/store";
import QuestionBottom from "../../Components/Post/QuestionBottom";
import { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } from "node-html-markdown";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const PostTopContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 16px;
`;

const PostTopInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 52px);
`;

const VotingComponentConatiner = styled.div`
  display: flex;
  height: 100%;
  margin-right: 16px;
`;

const VotingComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
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

const QuestionTopContainer = styled.div`
  min-height: 150px;
`;

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

const DeleteButton = styled.p`
  color: #a00000;
  margin-left: 10px;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  height: max-content;
  padding: 20px 5px 20px 0;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 100%;
    display: inline;
  }
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

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: inline;
    padding: 5px;
  }
`;

export default function Question({ postData }) {
  return (
    <PostTopContainer>
      <VotingComponentConatiner>
        <VotingComponent>
          <VotingButton>
            <img src={ArrowUpIcon} />
          </VotingButton>
          <VotingCounter>{postData.questionVoteCount}</VotingCounter>
          <VotingButton>
            <img src={ArrowDownIcon} />
          </VotingButton>
        </VotingComponent>
      </VotingComponentConatiner>
      <PostTopInnerContainer>
        <QuestionTopContainer>
          <ReactQuill theme="bubble" value={postData.questionProblemBody} readOnly={true} />
          <ReactQuill theme="bubble" value={postData.questionTryOrExpectingBody} readOnly={true} />
        </QuestionTopContainer>
        <TagsContainer>
          {postData &&
            postData.tag.map((tag) => {
              return <Tag key={tag.tagId}>{tag.tagName}</Tag>;
            })}
        </TagsContainer>
        <QuestionBottom postData={postData} />
      </PostTopInnerContainer>
    </PostTopContainer>
  );
}
