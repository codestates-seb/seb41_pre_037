import EmptyPostBackground from "../../icons/EmptyPostBackground.png";
import React from "react";
import styled from "styled-components/macro";

const ItemCard = styled.div`
  align-items: center;
  background-color: #f8f9f9;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  height: 400px;
  justify-content: center;
  padding: 12px;
  width: 100%;
`;

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: max-content;
  width: max-content;
`;

const Linker = styled.a`
  color: #0074cc;
  display: inline;
  font-size: 15px;
  margin: 0 5px 0 5px;

  &:hover {
    color: #49a5f0;
    cursor: pointer;
  }
`;

const Description = styled.span`
  color: #6a737c;
  display: inline;
  font-size: 15px;
`;

export default function EmptyPostBox() {
  return (
    <>
      <ItemCard>
        <InnerContainer>
          <img src={EmptyPostBackground} width="196px" height="196px" alt="empty post background" />
          <p
            css={`
              align-items: center;
            `}
          >
            <Description
              css={`
                display: block;
                margin-bottom: 10px;
                text-align: center;
              `}
            >
              Just getting started? Try answering a question!
            </Description>
            <p
              css={`
                display: inline;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              `}
            >
              <Description
                css={`
                  display: block;
                  text-align: center;
                `}
              >
                Your most helpful questions, answers and tags will appear here.
              </Description>
              <Linker>answering a question</Linker>
              <Description>or</Description>
              <Linker>selecting tags</Linker>
              <Description>that match topics you’re interested in.</Description>
            </p>
          </p>
        </InnerContainer>
      </ItemCard>
    </>
  );
}
