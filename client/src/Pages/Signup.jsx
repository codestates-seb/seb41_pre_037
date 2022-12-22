import styled from "styled-components"

const Background = styled.div`
  background-color: #f3f3f3;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto auto;
`


const SignupDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const SignupDetailHead = styled.h1`
  font-weight: 500;
  font-size: 28px;
`

const SignupDetail = styled.p`
  
`
const SignupDetailContent = styled.div`
  display: flex;
`

const SignupIcon = styled.div`
  margin-right: 10px;
  color: 	#0a95ff;
  padding-top: 10px;
`

const SignupFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
` 

const SignupForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #e4e4e4;
  width: 320px;
  height: 500px;
  background-color: white;
  box-shadow: 0 0 5px 5px #e4e4e4;
  margin-left: 25px;
  padding-top: 40px;
`
const SignupInputContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  width: 80%;
  display: flex;
  flex-direction: column;
`

const SignupLabel = styled.label`
  font-weight: 600;
`

const SignupInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #bababa;
  border-radius: 4px;
`

const PasswordValidation = styled.p`
  width: 80%;
  font-size: small;
  margin: 0 auto;
  margin-top: 10px;
  color: gray;
`
const SignupButton = styled.button`
  margin-top: auto;
  width: 80%;
  height: 35px;
  background-color: #0a95ff;
  color: white;
  border: 1px solid #0a95ff;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 0 #6fc0ff;
`

const SignupAgreeInfo = styled.p`
  width: 80%;
  color: gray;
  font-size: small;
  margin-bottom: 50px;
`

const Link = styled.a`
  color: #0a95ff;
`

export default function Signup() {
  return (
    <Background>
      <Container>
        <SignupDetailContainer>
          <SignupDetailHead>Join the Stack Overflow Community</SignupDetailHead>
          <SignupDetailContent>
            <SignupIcon>
              <svg width="26" height="26" fill="#0a95ff"><path opacity=".5" d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"></path><path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"></path></svg>
            </SignupIcon>
            <SignupDetail>
              Get Unstuck - ask a question
            </SignupDetail>
          </SignupDetailContent>
          <SignupDetailContent>
            <SignupIcon>
            <svg width="26" height="26" fill="#0a95ff"><path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"></path><path opacity=".5" d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"></path></svg>
            </SignupIcon>
            <SignupDetail>
            Unlock new privileges like voting and commenting
            </SignupDetail>
          </SignupDetailContent>
          <SignupDetailContent>
            <SignupIcon>
            <svg width="26" height="26" fill="#0a95ff"><path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"></path><path opacity=".5" d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"></path></svg>
            </SignupIcon>
            <SignupDetail>
              Save your favorite tags, filters, and jobs
            </SignupDetail>
          </SignupDetailContent>
          <SignupDetailContent>
            <SignupIcon>
            <svg width="26" height="26" fill="#0a95ff"><path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"></path></svg>
            </SignupIcon>
            <SignupDetail>
              Earn Reputation and badges
            </SignupDetail>
          </SignupDetailContent>
        </SignupDetailContainer>
        <SignupFormContainer>
          <SignupForm>
            <SignupInputContainer>
              <SignupLabel>Display Name</SignupLabel>
              <SignupInput/>
            </SignupInputContainer>
            <SignupInputContainer>
              <SignupLabel>Email</SignupLabel>
              <SignupInput/>
            </SignupInputContainer>
            <SignupInputContainer>
              <SignupLabel>Password</SignupLabel>
              <SignupInput/>
            </SignupInputContainer>
            <PasswordValidation>Passwords must contain at least eight characters, including at least 1 letter and 1 number.</PasswordValidation>
            <SignupButton>Sign up</SignupButton>
            <SignupAgreeInfo>By clicking “Sign up”, you agree to our <Link>terms of service</Link>, <Link>privacy policy</Link> and <Link>cookie policy</Link></SignupAgreeInfo>
          </SignupForm>
          <p css={`font-size : 20px;`}>Already have a account? <Link>Log in</Link></p>
        </SignupFormContainer>
      </Container>
    </Background>
  )
}
