import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";
import ArrowUpIcon from "../../icons/ArrowUpLg.svg";
import ArrowDownIcon from "../../icons/ArrowDownLg.svg";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { defaultStyle } from "react-syntax-highlighter/dist/esm/styles/hljs";
import AnswerBottom from "./AnswerBottom";

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

const AnswerTopContainer = styled.div``;

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

export default function AnswerItem({ answerData }) {
  return (
    <AnswerItemContainer>
      <VotingComponentConatiner>
        <VotingComponent>
          <VotingButton>
            <img src={ArrowUpIcon} />
          </VotingButton>
          <VotingCounter>{answerData.answerVoteCount}</VotingCounter>
          <VotingButton>
            <img src={ArrowDownIcon} />
          </VotingButton>
        </VotingComponent>
      </VotingComponentConatiner>
      <AnswerItemInnerContainer>
        <AnswerTopContainer>
          {answerData.answerContent}
          {/* <SyntaxHighlighter language="javascript" style={defaultStyle}>
            {markdown}
          </SyntaxHighlighter> */}
        </AnswerTopContainer>
        <AnswerBottom />
      </AnswerItemInnerContainer>
    </AnswerItemContainer>
  );
}
