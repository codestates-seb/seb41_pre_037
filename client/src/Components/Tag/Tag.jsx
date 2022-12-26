import styled from "styled-components/macro"

const TagContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 165px;
  max-height: 165px;
  border: 1px solid #c7c7c7;
  border-radius: 3px;
  padding: 10px;
`
const TagTitle = styled.div`
  width: max-content;
  padding: 5px 8px;
  height: 15px;
  border: 1px #e1ecf4;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #39739d;
  font-size: small;
`;

const TagDetail = styled.p`
  width: 100%;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
`
const TagInfo = styled.div`
  font-size: 13px;
  color: #afafaf;
`

export default function Tag() {
  return (
    <TagContainer>
      <TagTitle>Tag title</TagTitle>
      <TagDetail>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi laboriosam ea natus quaerat, tenetur adipisci aperiam corporis alias eaque illum placeat. Quis tempore quae rerum impedit! Sequi cumque esse ipsum.</TagDetail>
      <TagInfo>2990 questions</TagInfo>
    </TagContainer>
  )
}
