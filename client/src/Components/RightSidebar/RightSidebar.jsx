// 페이지, 리액트 컴포넌트, 정적파일 
import PencilIcon from "../../icons/Pencil.svg";
import LogoGraysm from "../../icons/LogoGraysm.svg";
import Comment from "../../icons/Comment.svg";

//로컬 모듈
import BREAKPOINT from "../../breakpoint";

// 라이브러리 및 라이브러리 메소드
import { useState } from "react";
import styled from "styled-components";


// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: max-content;
  width: max-content;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTRIGHTSIDEBAR}px) {
    display: none;
  }
`;

const BlogContainer = styled.ul`
  border: 1px solid #ead792;
  border-radius: 5px;
  box-shadow: 0 5px 5px gray;
  box-sizing: border-box;
  height: fit-content;
  list-style: none;
  padding: 0px;
  width: 270px;
`;

const ListHead = styled.li`
  background-color: #f9ebb8;
  border: 1px solid #ead792;
  border-radius: ${(props) => (props.radius ? props.radius : 0)};
  border-width: ${(props) => (props.borderWidth ? props.borderWidth : "1px")};
  box-sizing: border-box;
  color: #535353;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 600;
  font-size: small;
  height: 8%;
  list-style: none;
  padding: 10px;
  width: 100%;
`;

const ListItem = styled.li`
  background-color: #fff7db;
  border-radius: ${(props) => (props.radius ? props.radius : 0)};
  box-sizing: inherit;
  display: flex;
  font-size: small;
  height: fit-content;
  margin: 0;
  padding: 8px;
  width: 100%;
`;

const ListText = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
`;

const ListIcon = styled.div`
  display: flex;
  height: 12px;
  justify-content: center;
  margin-left: 5px;
  margin-right: 10px;
  width: 12px;
`;

const RelatedTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  justify-content: flex-end;
  width: max-content;
`;

const RelateTagsHead = styled.h2`
  font-weight: 500;
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  display: flex;
  height: fit-content;
  margin-bottom: 10px;
  width: max-content;
`;

const Tag = styled.div`
  background-color: #e1ecf4;
  border-radius: 5px;
  border: 1px #e1ecf4;
  color: #39739d;
  font-size: small;
  height: 15px;
  padding: 5px 8px;
  width: max-content;
`;

const TagCount = styled.p`
  color: gray;
  font-size: small;
  height: max-content;
  margin: 0;
  margin-left: 5px;
  padding-top: 7px;
`;

const TagLoader = styled.p`
  color: #0074cc;
  display: ${(props) => props.isClicked ? 'none' : 'flex'};

  &:hover {
    color: #50b3ff;
    cursor: pointer;
  }
`;

const MoreRelatedTagsContainer = styled.div`
  display: ${(props) => props.isClicked ? 'flex' : 'none'};
  flex-direction: column;
`

// Main Component
export default function RightSidebar() {
  // React States
  const [isClicked, setIsClicked] = useState(false);

  // Event Handlers
  const tagLoaderOnClickHandler = () => {
    setIsClicked(true)
  }

  return (
    <Container>
      <BlogContainer>
        <ListHead  borderWidth={"0 0 1px 0"} radius={"5px 5px 0 0"}>
          The Overflow Blog
        </ListHead>
        <ListItem>
          <ListIcon>
            <img alt="pencil" src={PencilIcon}/>
          </ListIcon>
          <ListText>
            Let's Talk about our favorite terminal tools (EP.521)
          </ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img alt="pencil" src={PencilIcon}/>
          </ListIcon>
          <ListText>
            Best practices to increase the speed for Next.js apps
          </ListText>
        </ListItem>
        <ListHead borderWidth={"1px 0 1px 0"}>Featured on Meta</ListHead>
        <ListItem>
          <ListIcon>
            <img alt="Comment" src={Comment}></img>
          </ListIcon>
          <ListText>Navigation and UI research starting soon</ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img alt="LogoGray" src={LogoGraysm}></img>
          </ListIcon>
          <ListText>
            Best practices to increase the speed for Next.js apps
          </ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img alt="LogoGray" src={LogoGraysm}></img>
          </ListIcon>
          <ListText>
            2022 Community Moderator Election Results - now with two more mods!
          </ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img alt="LogoGray" src={LogoGraysm}></img>
          </ListIcon>
          <ListText>Temporary policy: ChatGPT is banned</ListText>
        </ListItem>
        <ListItem>
          <ListIcon>
            <img alt="LogoGray" src={LogoGraysm}></img>
          </ListIcon>
          <ListText>I'm standing down as a moderator</ListText>
        </ListItem>
        <ListItem radius={"0 0 5px 5px"}>
          <ListIcon>
            <img alt="LogoGray" src={LogoGraysm}></img>
          </ListIcon>
          <ListText>
            Proposing a Community-Specific Closure Reason for non-English
            content
          </ListText>
        </ListItem>
      </BlogContainer>

      <RelatedTagsContainer>
        <RelateTagsHead>Related Tags</RelateTagsHead>
        <TagContainer>
          <Tag>Javascript</Tag>
          <TagCount>x 2600</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>Java</Tag>
          <TagCount>x 3003</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>CSS</Tag>
          <TagCount>x 30</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>Python</Tag>
          <TagCount>x 1008</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>C#</Tag>
          <TagCount>x 3003</TagCount>
        </TagContainer>
        <TagContainer>
          <Tag>C++</Tag>
          <TagCount>x 540</TagCount>
        </TagContainer>

        <TagLoader isClicked={isClicked} onClick={tagLoaderOnClickHandler}>more related tags</TagLoader>

        <MoreRelatedTagsContainer isClicked={isClicked}>
          <TagContainer>
            <Tag>Haksel</Tag>
            <TagCount>x 3002</TagCount>
          </TagContainer>
          <TagContainer>
            <Tag>Macdonalds</Tag>
            <TagCount>x 3223</TagCount>
          </TagContainer>
          <TagContainer>
            <Tag>BurgerKing</Tag>
            <TagCount>x 1643</TagCount>
          </TagContainer>
          <TagContainer>
            <Tag>Lotteria</Tag>
            <TagCount>x 363</TagCount>
          </TagContainer>
          <TagContainer>
            <Tag>ShakeShack</Tag>
            <TagCount>x 290</TagCount>
          </TagContainer>
        </MoreRelatedTagsContainer>  
      </RelatedTagsContainer>
    </Container>
  );
}
