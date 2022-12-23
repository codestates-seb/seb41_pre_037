import styled from "styled-components/macro";

const FooterComponent = styled.div`
  width: 100vw;
  height: 322px;
  position: relative;
  background-color: rgb(35, 38, 41);
  color: white;
`;

const Footer = () => {
  return (
    <>
      <FooterComponent>
        푸터 영역입니다 푸터 영역입니다 푸터 영역입니다 푸터 영역입니다 푸터
        영역입니다 푸터 영역입니다 푸터 영역입니다푸터 영역입니다푸터
        영역입니다푸터 영역입니다푸터 영역입니다푸터 영역입니다푸터
        영역입니다푸터 영역입니다푸터 영역입니다
      </FooterComponent>
    </>
  );
};

export default Footer;
