import Header from "../Components/Header/Header"
import styled from "styled-components/macro";
import { ReactComponent as AlertTriangle } from "../icons/AlertTriangle.svg";
import { ReactComponent as AlertTriangleS } from "../icons/AlertTriangleS.svg";
import BREAKPOINT from "../breakpoint";

const ErrorContainer = styled.div`
  .errorContainer {
    background-color: #e3e2e2;
    display: flex;
    width: 100%;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
      .fourZeroFour {
          display: none;
        }
      }
    .errorContent {
      display: flex;
      flex-direction: row;
      align-items: center;
    justify-content: center;
      @media screen and (max-width: ${BREAKPOINT.BREAKPOINTMOBILE}px) {
        flex-direction: column;
        .image {
            display:none;
        }
        .image2 {
            display: block;
            margin-bottom: 30px;
        }
      }
   }

    .image {
        margin-right: 30px;
        margin-bottom: 100px;
    }
    .image2 {
        display: none;
    }

    .fourZeroFour {
      font-size: 100px;
      margin: 0;
            
    }
  }


`

const NotFound = () => {
  return (
    <>
    <Header />
    <ErrorContainer>
    <div className="errorContainer">
      <div>
        <p className="fourZeroFour">404</p>
      </div>
      <div className="errorContent">
        <div className="image">
          <AlertTriangle />
        </div>
        <div className="image2">
          <AlertTriangleS />
        </div>
        <div>
          <h1>Page not found</h1>
          <div>
              <p>We're sorry, we couldn't find the page you requested.</p>
          </div>
          <div>

          <p>Go <a href="/">Home</a></p>
          <p>Browse our <a href="/AskQuestions">AskQuestions</a></p>
          <p>Browse our <a href="/Tags">Tags</a></p>
          <p>If you feel something is missing that should be here, <a href="/contact">contact us</a>.</p>
          </div>
        </div>
      </div>
    </div>
    </ErrorContainer>
    </>
  )
}

export default NotFound;
