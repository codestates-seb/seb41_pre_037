import React from "react";
import styled from "styled-components/macro";
import BREAKPOINT from "../../breakpoint";

const TagContainer = styled.div`
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

export default function Tag({ tagData }) {
  return <TagContainer>{tagData.tagName}</TagContainer>;
}
