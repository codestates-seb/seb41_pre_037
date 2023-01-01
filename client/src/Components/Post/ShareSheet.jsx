import React from "react";
import styled from "styled-components/macro";
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from "react-share";

const ShareSheetContainer = styled.div`
  display: flex;
  position: absolute;
  top: 25px;
  left: -10px;
`;

const ShareSheetTooltip = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 0.4em;
  box-shadow: 0 1px 3px #0000000f, 0 2px 6px #0000000f, 0 3px 8px #00000017;
  width: 340px;
  height: 115px;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;

  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 28px;
    height: 28px;
    transform: rotate(45deg);
    top: -2px;
    left: 12px;
    z-index: 2;
    background-color: #ffffff;
    box-sizing: border-box;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 30px;
    height: 30px;
    transform: rotate(45deg);
    top: -3px;
    left: 10px;
    z-index: -2;
    background-color: #ffffff;
    border: 1px solid #dbdbdb;
    box-shadow: 0 1px 3px #0000000f, 0 2px 6px #0000000f, 0 3px 8px #00000017;
    box-sizing: border-box;
  }
`;

const ShareSheetInnerContainer = styled.div`
  display: flex;
  width: 340px;
  height: 115px;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  padding: 12px;
  box-sizing: border-box;
`;

const Label = styled.div`
  display: block;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 15px;
`;

const ShareLinkInput = styled.input`
  display: block;
  width: 316px;
  height: 30px;
  padding: 0 5px 0 5px;
  box-sizing: border-box;
  color: #525960;
`;

const ShareSheetBottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Linker = styled.a`
  all: unset;
  display: inline;
  color: #2880d1;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    color: #4293f8;
  }
`;

const SNSContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const handleCopyClipBoard = async (text) => {
  await navigator.clipboard.writeText(text);
};

export default function ShareSheet({ handleShareSheet }) {
  return (
    <>
      {handleShareSheet ? (
        <ShareSheetContainer>
          <ShareSheetInnerContainer>
            <Label>Share a link to this question</Label>
            <ShareLinkInput value={window.location.href} />
            <ShareSheetBottomContainer>
              <Linker onClick={() => handleCopyClipBoard(window.location.href)}>Copy Link</Linker>
              <SNSContainer>
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon
                    size={18}
                    css={`
                      border-radius: 2px;
                    `}
                  ></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton style={{ marginLeft: "10px" }} url={window.location.href}>
                  <TwitterIcon
                    size={18}
                    css={`
                      border-radius: 2px;
                    `}
                  ></TwitterIcon>
                </TwitterShareButton>
              </SNSContainer>
            </ShareSheetBottomContainer>
          </ShareSheetInnerContainer>
          <ShareSheetTooltip />
        </ShareSheetContainer>
      ) : null}
    </>
  );
}
