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
import Tag from "../../Components/Tag/Tag";
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

const DUMMYMARKDOWNTEXT = `<script>
export let audio;

let isPaused = true;

const onClick = () => {
    if (!audio) return;

    isPaused = !isPaused;
    if (isPaused) {
        audio.pause();
    } else {
        audio.play();
    }
};
</script>

<button onclick={onClick}>{#if isPaused} Play {:else} Pause {/if}</button>
`;

export default function Question({ postData }) {
  const { handleShareSheet } = useShareSheetStore((state) => state);
  let domParser = new DOMParser();
  let doc = domParser.parseFromString(postData.questionTryOrExpectingBody, "text/html");
  console.log(doc);
  const nhm = NodeHtmlMarkdown.translate("");
  console.log(nhm);

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
          <ReactQuill theme="bubble" style={{ height: "250px" }} value={postData.questionProblemBody} readOnly={true} />
          <ReactQuill
            theme="bubble"
            style={{ height: "250px" }}
            value={postData.questionTryOrExpectingBody}
            readOnly={true}
          />
        </QuestionTopContainer>
        <TagsContainer>
          {/* {postData && postData.map((postData) => <Tag tagData={postData.tag} key={postData.tag.tagId} />)} */}
        </TagsContainer>
        <QuestionBottom />
      </PostTopInnerContainer>
    </PostTopContainer>
  );
}
