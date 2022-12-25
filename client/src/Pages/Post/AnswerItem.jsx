import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import ArrowUpIcon from "../../icons/ArrowUpLg.svg";
import ArrowDownIcon from "../../icons/ArrowDownLg.svg";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { defaultStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AnswerItemContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e3e3e3;
  padding: 16px 0 16px 0;
`;

const AnswerItemInnerContainer = styled.div`
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
  padding: 20px 5px 20px 0;
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

const markdown = `<script>
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

export default function Question() {
  return (
    <AnswerItemContainer>
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
      <AnswerItemInnerContainer>
        <QuestionTopContainer>
          <SyntaxHighlighter language="javascript" style={defaultStyle}>
            {markdown}
          </SyntaxHighlighter>
        </QuestionTopContainer>
        <QuestionBottomContainer>
          <ShareLinker>Share</ShareLinker>
          <AuthorInfoContainer>
            <AuthorProfileImageArea />
            <AuthorProfileLinker>joenpc npcsolution</AuthorProfileLinker>
          </AuthorInfoContainer>
        </QuestionBottomContainer>
      </AnswerItemInnerContainer>
    </AnswerItemContainer>
  );
}
