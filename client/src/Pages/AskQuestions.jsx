// 페이지, 리액트 컴포넌트, 정적파일 
import Header from "../Components/Header/Header"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

//로컬 모듈
import BREAKPOINT from "../breakpoint"
import quillModule from "../quillModule"
import '../quillEditor.css'
import { useIsLoginStore } from "../store/loginstore"

// 라이브러리 및 라이브러리 메소드
import { useState, useEffect } from "react"
import styled from "styled-components/macro"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"

// Styled Component (html tree 계층 순) (CSS 속성은 a-z 순)
const Background = styled.div`
  width: 100vw;
  height: max-content;
  background-color: #f6f6f6;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0 3%;
  padding-bottom: 50px;
  width: 1310px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    width: 100%;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 100%;
  }
`;

const QuestionsHeaderContainer = styled.div`
  background-image: url(https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368);
  background-position: right;
  background-repeat: no-repeat;
  display: flex;
  height: 130px;
  width: 100%;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    background-image: none;
    height: 80px;
  }
`;

const QuestionHeader = styled.h1`
  font-size: 27px;
  font-weight: 600;
  margin: auto 0;
  text-align: center;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: 22px;
  }
`;

const QuestionRuleContainer = styled.div`
  background-color: #EBF4FB;
  box-sizing: border-box;
  border:1px solid #a9cfec;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  height: max-content;
  margin-top: 17px;
  min-width: 390px;
  padding: 24px;
  width: 70%;

  @media screen and (max-width: 1100px) {
    min-width: 0;
    width: 100%;
  }
`;

const QuestionRuleHeader = styled.h2`
  font-size: 21px;
  font-weight: 350;
  height: max-content;
  margin: 0;
  margin-bottom: 10px;
`;

const QuestionRuleBody = styled.p`
  font-size: 15px;
  font-weight: 400;
  height: max-content;
  margin: 0;
  margin-bottom: 2px;
`;

const Linker = styled.a`
  color: #0b62a4;
`;

const QuestionRuleUlHeader = styled.h5`
  margin: 0;
  margin-top: 15px;
  font-weight: 500;
`;

const QuestionRuleUl = styled.ul`
  font-size: small;
  padding: 0;
  padding-left: 30px;
  margin: 0;
  margin-top: 10px;
`;

const QuestionTipContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 28%;
  height: 150px;
  margin-top: 20px;
  margin-left: 20px;
  position: absolute;
  right: 20px;
  box-sizing: border-box;

  @media screen and (max-width: 1100px) {
    position: relative;
    height: fit-content;
    width: 100%;
    margin-left: 18px;
  }
 `;

const QuestionTipContentBox = styled.div`
  width: 100%;
  height: max-content;
  border: 1px solid #cacaca;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const QuestionTipTitle = styled.div`
  border: 1px solid #cacaca;
  border-width: 0 0 1px 0;
  padding: 12px;
  background-color: #f6f6f6;
`;

const QuestionTipContent = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100%;
`;

const QuestionTipSVG = styled.div`
  display: flex;
  padding-top: 15px;
  margin-left: 15px;
`;

const QuestionTipText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px 10px;
`;

const QuestionContainer = styled.div`
  background-color: white;
  border: 1px solid #cacaca;
  border-radius: 2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: ${props => typeof(props.height) === 'string' ? props.height : props.heightpx};
  padding: 24px;
  position: relative;
  margin-top: 17px;
  min-width: 390px;
  width: 70%;

  @media screen and (max-width: 1100px) {
    min-width: 0;
    width: 100%;
  }
`;

const QuestionBlinder = styled.div`
  background-color: #ffffffc6;
  border: 1px solid #d1d1d1df;
  display: ${props => props.isValid && 'none'};
  height: 100%;
  left: -1px;
  position: absolute;
  top: -1px;
  width: 100%;
  z-index: 10;
  
  &:hover{
    cursor: not-allowed;
  }
`;

const QuestionLabel = styled.label`
  font-weight: 500;
  margin-bottom: 2px;
`;

const QuestionLabelDetail = styled.label`
  font-size: 12px;
  font-weight: 300;
`;

const QuestionInput = styled.input`
  box-sizing: border-box;
  border: 1px solid #cacaca;
  border-radius: 4px;
  height: 30px;
  margin-top: 10px;
  width: 100%;

  &:focus-within{
    border: 1px solid rgba(0, 103, 194, 0.4);
    box-shadow: 0 0 0 4px rgba(144, 203, 255, 0.4);
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #0a95ff;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: inset 0 1px 0 0 #6fc0ff;
  color: white;
  display: ${props => props.isHidden ? 'none' : 'flex'};
  height: 35px;
  padding: 10px;
  position: relative;
  margin: auto 0;
  margin-top: 10px;
  width: max-content;

  &:hover {
    background-color: #306fa0;
    border: 1px solid #306fa0;
    box-shadow: inset 0 1px 0 0 #65869e;
    color: #aeaeae;
    cursor: pointer;
  }
`;

const ButtonBlinder = styled.div`
  background-color: #ffffffac;
  border: 1px solid #ffffffac;
  border-radius: 4px;
  display: ${props => props.isValid && 'none'};
  height: 106%;
  left: -1px;
  top: -1px;
  position: absolute;
  width: 104%;
  z-index: 10;

  &:hover {
    cursor: not-allowed;
  }
`;

const TagsInputContainer = styled.div`
  border: 1px solid #cacaca;
  border-radius: 4px;
  display: flex;
  height: 35px;
  width: 100%;
  
  &:focus-within{
    border: 1px solid rgba(0, 103, 194, 0.4);
    box-shadow: 0 0 0 4px rgba(144, 203, 255, 0.4);
  }
`;

const TagsInput = styled.input`
  background-color: transparent;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  height: 30px;
  padding-top: 3px;
  width: 100%;

  &:focus-within{
    outline: none;
  }
`;

const Tag = styled.div`
  align-items: center;
  background-color: #e1ecf4;
  border: 1px #e1ecf4;
  border-radius: 5px;
  color: #39739d;
  display: flex;
  font-size: small;
  height: 15px;
  padding: 5px 8px;
  margin: 5px 3px 0 3px;
  width: max-content;
`;

const TagDeleteButton = styled.div`
  border-radius: 4px;
  color: #39739d;
  display: flex;
  height: 12px;
  padding: 4px;
  justify-content: center;
  margin-left: 5px;
  width: 12px;

  &:hover {
    background-color: #85b5d7;
    cursor: pointer;
  }
`;

const QuestionEditorContainer = styled.div`
  height: 300px;
  margin-top: 10px;
`;

const QuestionButtonContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  height: max-content;
  width: max-content;
`;

 const QuestionDiscardButton = styled.p`
    color: #a00000;
    display: ${props => props.isHidden && 'none'};
    font-size: small;
    margin : 10px;
    margin-top: 20px;

    &:hover {
      cursor: pointer;
      color: red;
    }
 `;

// Main Component
export default function AskQuestions() {
  // React States
  const [titleInput, setTitleInput] = useState('');
  const [isTitleNextClicked, setIsTitleNextClicked] = useState(false);
  const [titleValid, setTitleValid] = useState(false);
  const [contentValue, setContentValue] = useState('');
  const [contentValid, setContentValid] = useState(false);
  const [isContentNextClicked, setIsContentNextClicked] = useState(false);
  const [extraContentValue, setExtraContentValue] = useState('');
  const [extraContentValid, setExtraContentValid] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const [tagsArr, setTagsArr] = useState([]);
  const [tagsValid, setTagsValid] = useState(false);
  const [isTagsNextClicked, setIsTagsNextClicked] = useState(false);

  // Other Hooks
  const navigate = useNavigate();
  const { isLogin } = useIsLoginStore((state) => state);
  
  // useEffect 
  // 로그인 하지 않았을 시 로그인 페이지로 리다이렉트
  useEffect(() => {
    if(!isLogin) {
      navigate('/login');
    }
  },[]);

  // Tag 생성
  useEffect(() => {
    if(tagsArr.length >= 1) {
      setTagsValid(true);
    } else {
      setTagsValid(false);
    }

  },[tagsArr]);

  // Ajax function (Axios)
  const postQuestionData = () => {
    const accessToken = sessionStorage.getItem('accesstoken');
    axios.defaults.withCredentials = true;
    
    const headers = {
      'Authorization' : `Bearer ${accessToken}`,
      'Content-Type' : 'Application/json',
      'Accept' : '*/*'
    };

    const data = {
      questionTitle : titleInput,
      questionProblemBody : contentValue,
      questionTryOrExpectingBody : extraContentValue,
      tag : tagsArr.map((tag) => {return {tagName : tag}}),
    };

    return axios.post(`${process.env.REACT_APP_SERVER_URI}questions/ask/post`, data, { headers });
  }

  // Ajax OnSuccess / onError
  const createQuestionOnSuccess = () => {
    window.alert('successfuly posted questions!');
    navigate('/');
  }

  const createQuestionsOnError = error => {
    window.alert('Posting failed. Your login session may have seen expired. please retry login and post');
    sessionStorage.clear();
    navigate('/login');
  }

  // Ajax Tanstack Query
  const {mutate:createQuestion} = useMutation({
    mutationKey:['createQuestion'], 
    mutationFn: postQuestionData, 
    onSuccess: createQuestionOnSuccess,
    onError: createQuestionsOnError,
  })

  // Event Handlers
  const titleOnChangeHandler = e => {
    setTitleInput(e.target.value);
    if(titleInput.length >= 15) {
      setTitleValid(true);
    } 
    else {
      setTitleValid(false);
    }
  }

  const contentOnChangeHandler = content => {
    const rawText = content.replaceAll(/<[^>]*>/g, '');
    setContentValue(content);
    if(rawText.length >= 22) {
      setContentValid(true);
    } 
    else {
      setContentValid(false);
    }
  }

  const extraContentOnChangeHandler = content => {
    const rawText = content.replaceAll(/<[^>]*>/g, '');
    setExtraContentValue(content);
    if(rawText.length >= 22) {
      setExtraContentValid(true);
    } 
    else {
      setExtraContentValid(false);
    }
  }

  const tagsOnChangeHandler = e => {
    const tagsText = (e.target.value.trim()).replace(',', '');
    setTagsInput(tagsText);
  }

  const tagsOnKeyUpHandler = e => {
    if((e.key === ',' || e.keyCode === 32) && tagsInput.length > 0) {
      setTagsArr([...tagsArr, tagsInput.slice(0, tagsInput.length)]);
      setTagsInput('');
    }
  }

  const tagDeleteButtonClickHandler = index => {

    if(index === 0) {
      const newTagsArr = [...tagsArr.slice(1)];
      setTagsArr(newTagsArr);
    }
    else if(index === tagsArr.length - 1) {
      const newTagsArr = [...tagsArr.slice(0, index)];
      setTagsArr(newTagsArr);
    } 
    else {
      const newTagsArr = [...tagsArr.slice(0, index), ...tagsArr.slice(index + 1)];
      setTagsArr(newTagsArr);
    }
  }

  const postQuestionOnClickHandler = () => {
    createQuestion();
  }

  // const testHandler = () => {
  //   const data = {
  //     quesstionTitle : titleInput,
  //     questionProblemBody : contentValue,
  //     questionTryOrExpectingBody : extraContentValue,
  //     tag : tagsArr.map((tag) => {return {tagName : tag}}),
  //   }
  //   console.log(JSON.stringify(data));
  // }

  return (
    <>
    <Header/>
      <Background>
      <Container>
        <QuestionsHeaderContainer>
          <QuestionHeader>Ask a public question</QuestionHeader>
        </QuestionsHeaderContainer>
        <QuestionRuleContainer>
          <QuestionRuleHeader>Writing a good question</QuestionRuleHeader>
          <QuestionRuleBody>You’re ready to <Linker>ask</Linker> a <Linker>programming-related question</Linker> and this form will help guide you through the process.</QuestionRuleBody>
          <QuestionRuleBody>Looking to ask a non-programming question? See <Linker>the topics </Linker> here to find a relevant site.</QuestionRuleBody>
          <QuestionRuleUlHeader>Steps</QuestionRuleUlHeader>
          <QuestionRuleUl>
            <li css={`margin-bottom: 2px;`}>Summarize your problem in a one-line title.</li>
            <li css={`margin-bottom: 2px;`}>Describe your problem in more detail.</li>
            <li css={`margin-bottom: 2px;`}>Describe what you tried and what you expected to happen.</li>
            <li css={`margin-bottom: 2px;`}>Add “tags” which help surface your question to members of the community.</li>
            <li css={`margin-bottom: 2px;`}>Review your question and post it to the site.</li>
          </QuestionRuleUl>
        </QuestionRuleContainer>
        <div css={`
          display: flex;
          @media screen and (max-width : 1100px) {
            flex-direction : column;
          }
        `}>
          <QuestionTipContainer>
            <QuestionTipContentBox>
              <QuestionTipTitle>Writing a good question</QuestionTipTitle>
              <QuestionTipContent>
                <QuestionTipSVG><svg aria-hidden="true" width="48" height="48" viewBox="0 0 48 48"><path opacity=".2" d="M31.52 5.2a.34.34 0 0 0-.46.08L7 39.94a.34.34 0 0 0-.06.16l-.54 5.21c-.03.26.24.45.48.34l4.77-2.29c.05-.02.1-.06.13-.1L35.83 8.58a.34.34 0 0 0-.09-.47l-4.22-2.93Z"></path><path d="M28.53 2.82c.4-.58 1.2-.73 1.79-.32l4.22 2.92c.58.4.72 1.2.32 1.79L10.82 41.87c-.13.18-.3.33-.5.43l-4.77 2.28c-.9.44-1.93-.29-1.83-1.29l.55-5.2c.02-.22.1-.43.22-.6L28.53 2.81Zm4.43 3.81L29.74 4.4 28.2 6.6l3.22 2.24 1.53-2.21Zm-2.6 3.76-3.23-2.24-20.32 29.3 3.22 2.24 20.32-29.3ZM5.7 42.4 8.62 41l-2.57-1.78-.34 3.18Zm35.12.3a1 1 0 1 0-.9-1.78 35 35 0 0 1-7.94 3.06c-1.93.43-3.8.3-5.71-.04-.97-.17-1.93-.4-2.92-.64l-.3-.07c-.9-.21-1.81-.43-2.74-.62-2.9-.58-6.6-.49-9.43.65a1 1 0 0 0 .74 1.86c2.4-.96 5.68-1.07 8.3-.55.88.18 1.77.4 2.66.6l.3.08c1 .24 2 .48 3.03.66 2.07.37 4.22.53 6.5.02 3-.67 5.77-1.9 8.41-3.22Z"></path></svg></QuestionTipSVG>
                <QuestionTipText>
                  <p css={`font-size : 12px; margin: 0; margin-bottom: 5px;`}>Your title should summarize the problem.</p>
                  <p css={`font-size : 12px; margin: 0;`}>You might find that you have a better idea of your title after writing out the rest of the question.</p>
                </QuestionTipText>
              </QuestionTipContent>
            </QuestionTipContentBox>
        </QuestionTipContainer>
        <QuestionContainer height={125}>
          <QuestionLabel>Title</QuestionLabel>
          <QuestionLabelDetail>Be specific and imagine you’re asking a question to another person. Minimum 15 characters.</QuestionLabelDetail>
          <QuestionInput onChange={titleOnChangeHandler} value={titleInput}/>
          <Button isDisabled={true} isHidden={false} onClick={() => {setIsTitleNextClicked(true)}}>
            <ButtonBlinder isValid={titleValid}/>
            Next
          </Button>
        </QuestionContainer>
        </div>
        <QuestionContainer height={'max-content'}>
          <QuestionBlinder isValid={isTitleNextClicked}/>
          <QuestionLabel>What are the details of your problem?</QuestionLabel>
          <QuestionLabelDetail>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</QuestionLabelDetail>
          <QuestionEditorContainer>
            <ReactQuill theme="snow" modules={quillModule} style={{height : '250px'}} value={contentValue} onChange={contentOnChangeHandler}/>
          </QuestionEditorContainer>
          <Button isHidden={!contentValid} onClick={() => {setIsContentNextClicked(true)}}>Next</Button>
        </QuestionContainer>
        <QuestionContainer height={'max-content'}>
          <QuestionBlinder isValid={isContentNextClicked}/>
          <QuestionLabel>What did you try and what were you expecting?</QuestionLabel>
          <QuestionLabelDetail>Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters.</QuestionLabelDetail>
          <QuestionEditorContainer>
            <ReactQuill theme="snow" modules={quillModule} style={{height : '250px'}} value={extraContentValue} onChange={extraContentOnChangeHandler}/>
          </QuestionEditorContainer>
          <Button isHidden={!extraContentValid} onClick={() => {setIsTagsNextClicked(true)}}>Next</Button>
        </QuestionContainer>
        <QuestionContainer height={125}>
          <QuestionBlinder isValid={isTagsNextClicked}/>
          <QuestionLabel>Tags</QuestionLabel>
          <QuestionLabelDetail>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</QuestionLabelDetail>
          <TagsInputContainer>
            {tagsArr.map((tag, index) => {
              return (             
              <Tag key={index}>
                {tag}
                <TagDeleteButton onClick={() => {tagDeleteButtonClickHandler(index)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill='#306fa0' d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                </TagDeleteButton>
              </Tag>
              )
            })}
            <TagsInput value={tagsInput} onChange={tagsOnChangeHandler} onKeyUp={tagsOnKeyUpHandler}/>
          </TagsInputContainer>
        </QuestionContainer>
        <QuestionButtonContainer>
          <Button isDisabled={true} onClick={postQuestionOnClickHandler}>
            <ButtonBlinder isValid={titleValid && contentValid && extraContentValid && tagsValid}/>
            Post your question
          </Button>
          <QuestionDiscardButton isHidden={!titleValid} onClick={() => {navigate('/')}}>Discard draft</QuestionDiscardButton>
        </QuestionButtonContainer>
      </Container>
      </Background>
    </>
  )
}
