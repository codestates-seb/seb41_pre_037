import BREAKPOINT from "../../breakpoint";
import React from "react";
import styled from "styled-components/macro";

const TagContainer = styled.div`
  background-color: #e1ecf4;
  border: 1px #e1ecf4;
  border-radius: 5px;
  color: #39739d;
  font-size: small;
  height: 15px;
  margin-right: 5px;
  padding: 5px 8px;
  width: max-content;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    display: inline;
    padding: 5px;
  }
`;

export default function Tag({ tagData }) {
  return <TagContainer>{tagData.tagName}</TagContainer>;
}
