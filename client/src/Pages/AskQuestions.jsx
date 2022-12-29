import Header from "../Components/Header/Header"
import styled from "styled-components/macro"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import quillModule from "../quillModule"
import '../quillEditor.css'
import BREAKPOINT from "../breakpoint"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"

const Background = styled.div`
  width: 100vw;
  height: max-content;
  background-color: #f6f6f6;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  width: 1310px;
  display: flex;
  flex-direction: column;
  padding: 0 3%;
  padding-bottom: 50px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    width: 100%;
  }

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    width: 100%;
  }
`

const QuestionsHeaderContainer = styled.div`
  display: flex;
  background-image: url(https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368);
  background-repeat: no-repeat;
  background-position: right;
  width: 100%;
  height: 130px;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTTABLET}px) {
    background-image: none;
    height: 80px;
  }
`

const QuestionHeader = styled.h1`
  font-size: 27px;
  font-weight: 600;
  text-align: center;
  margin: auto 0;

  @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
    font-size: 22px;
  }
`

const QuestionRuleContainer = styled.div`
  width: 70%;
  min-width: 390px;
  height: max-content;
  background-color: #EBF4FB;
  margin-top: 17px;
  border:1px solid #a9cfec;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 2px;

  @media screen and (max-width: 1100px) {
    width: 100%;
    min-width: 0;
  }

`

const QuestionRuleHeader = styled.h2`
  font-size: 21px;
  font-weight: 350;
  height: max-content;
  margin: 0;
  margin-bottom: 10px;
`
const QuestionRuleBody = styled.p`
  font-size: 15px;
  font-weight: 400;
  height: max-content;
  margin: 0;
  margin-bottom: 2px;
`
const Linker = styled.a`
  color: #0b62a4;
`

const QuestionRuleUlHeader = styled.h5`
  margin: 0;
  margin-top: 15px;
  font-weight: 500;
`
const QuestionRuleUl = styled.ul`
  font-size: small;
  margin: 0;
  padding: 0;
  padding-left: 30px;
  margin-top: 10px;
`
const QuestionBlinder = styled.div`
  top: -1px;
  left: -1px;
  width: 100%;
  height: 100%;
  border: 1px solid #d1d1d1df;
  position: absolute;
  z-index: 10;
  background-color: #ffffffc6;
  display: ${props => props.isValid && 'none'};
  
  &:hover{
    cursor: not-allowed;
  }
`

const QuestionContainer = styled.div`
  position: relative;
  width: 70%;
  min-width: 390px;
  display: flex;
  flex-direction: column;
  height: ${props => typeof(props.height) === 'string' ? props.height : props.heightpx};
  border: 1px solid #cacaca;
  margin-top: 17px;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: white;

  @media screen and (max-width: 1100px) {
    width: 100%;
    min-width: 0;
  }
`
const QuestionLabel = styled.label`
  font-weight: 500;
  margin-bottom: 2px;
`
const QuestionLabelDetail = styled.label`
  font-size: 12px;
  font-weight: 300;
`
const QuestionInput = styled.input`
  width: 100%;
  height: 30px;
  margin-top: 10px;
  box-sizing: border-box;
  border: 1px solid #cacaca;
  border-radius: 4px;
`
const TagsInputContainer = styled.div`
  width: 100%;
  height: 35px;
  border: 1px solid #cacaca;
  border-radius: 4px;
  display: flex;
`

const TagsInput = styled.input`
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  padding-top: 3px;

  &:focus-within{
    outline: none;
  }
`
const Tag = styled.div`
  width: max-content;
  padding: 5px 8px;
  height: 15px;
  border: 1px #e1ecf4;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #39739d;
  font-size: small;
  margin: 5px 3px 0 3px;
  display: flex;
  align-items: center;
`;

const TagDeleteButton = styled.div`
  width: 12px;
  height: 12px;
  color: #39739d;
  display: flex;
  border-radius: 4px;
  justify-content: center;
  margin-left: 5px;
  padding: 4px;

  &:hover {
    background-color: #85b5d7;
    cursor: pointer;
  }
`

const QuestionEditorContainer = styled.div`
  margin-top: 10px;
  height: 300px;
`

const QuestionButtonContainer = styled.div`
  display: flex;
  width: max-content;
  height: max-content;
  box-sizing: border-box;
`
const Button = styled.button`
  position: relative;
  margin: auto 0;
  margin-top: 10px;
  width: max-content;
  padding: 10px;
  height: 35px;
  background-color: #0a95ff;
  color: white;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;
  box-sizing: border-box;
  display: ${props => props.isHidden ? 'none' : 'flex'};

  &:hover {
    background-color: #306fa0;
    color: #aeaeae;
    border: 1px solid #306fa0;
    box-shadow: inset 0 1px 0 0 #65869e;
    cursor: pointer;
  }
`;

const ButtonBlinder = styled.div`
  position: absolute;
  width: 104%;
  height: 106%;
  top: -1px;
  left: -1px;
  background-color: #ffffffac;
  border: 1px solid #ffffffac;
  border-radius: 4px;
  z-index: 10;
  display: ${props => props.isValid && 'none'};
  &:hover {
    cursor: not-allowed;
  }
`;

 const QuestionDiscardButton = styled.p`
    color: #a00000;
    font-size: small;
    margin : 10px;
    margin-top: 20px;
    display: ${props => props.isHidden && 'none'};

    &:hover {
      cursor: pointer;
      color: red;
    }
 `

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
 `

const QuestionTipContentBox = styled.div`
  width: 100%;
  height: max-content;
  border: 1px solid #cacaca;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  background-color: white;
`

const QuestionTipTitle = styled.div`
  border: 1px solid #cacaca;
  border-width: 0 0 1px 0;
  padding: 12px;
  background-color: #f6f6f6;
`

const QuestionTipContent = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100%;
`

const QuestionTipSVG = styled.div`
  display: flex;
  padding-top: 15px;
  margin-left: 15px;
`
const QuestionTipText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px 10px;
`



export default function AskQuestions() {
  const [titleInput, setTitleInput] = useState('');
  const [contentValue, setContentValue] = useState('');
  const [extraContentValue, setExtraContentValue] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [tagsArr, setTagsArr] = useState([]);
  const [titleValid, setTitleValid] = useState(false);
  const [isTitleNextClicked, setIsTitleNextClicked] = useState(false);
  const [contentValid, setContentValid] = useState(false);
  const [isContentNextClicked, setIsContentNextClicked] = useState(false);
  const [extraContentValid, setExtraContentValid] = useState(false);
  const [tagsValid, setTagsValid] = useState(false);
  const [isTagsNextClicked, setIsTagsNextClicked] = useState(false);

  const navigate = useNavigate();


  const postQuestionData = () => {
    const data = {
      questionTitle : titleInput,
      questionProblemBody : contentValue,
      questionTryOrExpectingBody : extraContentValue,
      tag : tagsArr.map((tag) => {return {tagName : tag}}),
    }

    const accessToken = sessionStorage.getItem('accesstoken');

    const headers = {
      'Authorization' : `Bearer ${accessToken}`,
      'Content-Type' : 'Application/json',
      'Accept' : '*/*'
    }

    axios.defaults.withCredentials = true;
    
    console.log(data, {headers}, accessToken);
    return axios.post(`${process.env.REACT_APP_SERVER_URI}questions/ask/post`, data, {headers});
  }

  const {mutate:createQuestion} = useMutation({mutationKey:['createQuestion'], mutationFn: postQuestionData});


  useEffect(() => {
    if(tagsArr.length >= 1) {
      setTagsValid(true);
    } else {
      setTagsValid(false);
    }

  },[tagsArr]);


  //----------------------------event handlers-----------------------------------------------------

  const titleOnChangeHandler = e => {
    setTitleInput(e.target.value);
    if(titleInput.length >= 15) {
      setTitleValid(true);
    } else {
      setTitleValid(false);
    }
  
  }

  const contentOnChangeHandler = content => {
    const rawText = content.replaceAll(/<[^>]*>/g, '');
    setContentValue(content);
    if(rawText.length >= 22) {
      setContentValid(true);
    } else {
      setContentValid(false);
    }
  }

  const extraContentOnChangeHandler = content => {
    const rawText = content.replaceAll(/<[^>]*>/g, '');
    setExtraContentValue(content);
    if(rawText.length >= 22) {
      setExtraContentValid(true);
    } else {
      setExtraContentValid(false);
    }
  }

  const tagsOnChangeHandler = e => {
    const tagsText = (e.target.value.trim()).replace(',', '');
    setTagsInput(tagsText);
  }

  const tagsOnKeyUpHandler = e => {
    console.log(e.key);
    if((e.key === ',' || e.keyCode === 32) && tagsInput.length > 0) {
      setTagsArr([...tagsArr, tagsInput.slice(0, tagsInput.length)]);
      setTagsInput('');
    }
  }

  const tagDeleteButtonClickHandler = index => {
    console.log(index);

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

    const createQuestionOnSuccess = () => {

    }
    createQuestion({onSuccess : createQuestionOnSuccess });
  }

  const testHandler = () => {
    const data = {
      quesstionTitle : titleInput,
      questionProblemBody : contentValue,
      questionTryOrExpectingBody : extraContentValue,
      tag : tagsArr.map((tag) => {return {tagName : tag}}),
    }

    console.log(JSON.stringify(data));
  }

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
          <QuestionInput value={titleInput} onChange={titleOnChangeHandler}/>
          <Button isHidden={false} isDisabled={true} onClick={() => {setIsTitleNextClicked(true)}}>
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
