// 라이브러리 및 라이브러리 메소드
import styled from "styled-components/macro"

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const TagContainer = styled.div`
  border: 1px solid #c7c7c7;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  height: max-content;
  max-height: 165px;
  padding: 10px;
  width: auto;
`
const TagTitle = styled.div`
  background-color: #e1ecf4;
  border: 1px #e1ecf4;
  border-radius: 5px;
  color: #39739d;
  font-size: small;
  height: 15px;
  padding: 5px 8px;
  width: max-content;
`;

const TagDetail = styled.p`
  display: -webkit-box;
  font-size: 14px;
  overflow: hidden;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`
const TagInfo = styled.div`
  font-size: 13px;
  color: #afafaf;
`

export default function Tag({data}) {
  return (
    <TagContainer>
      <TagTitle>{data.tagName}</TagTitle>
      <TagDetail>{data.tagBody}</TagDetail>
      <TagInfo>{data.questionAmount}</TagInfo>
    </TagContainer>
  )
}
