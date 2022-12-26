package com.example.stackoverflowclone.global.security.auth.handler;


import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.member.service.MemberService;
import com.example.stackoverflowclone.global.security.auth.jwt.JwtTokenizer;
import com.example.stackoverflowclone.global.security.auth.utils.CustomAuthorityUtils;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
* OAuth2 인증후 Frontend 애플리케이션 쪽으로 JWT 전송하는 역할
* SimpleUrlAuthenticationSuccessHandler을 상속받으면 리다이렉트를 손쉽게 할 수 있음
* getRedirectStrategy().sendRedirect(); --> 리다이렉트 메서드
* */

@Slf4j
@AllArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 인증된 객체로 부터 Resource Owner의 이메일 주소를 얻을 수 있다.
        log.info("# Redirect to Frontend");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String name = (String) oAuth2User.getAttributes().get("name");
        String email = (String) oAuth2User.getAttributes().get("email");
        String picture = (String) oAuth2User.getAttributes().get("picture");

        log.info("# getPrincipal : " + oAuth2User);
        log.info("# name : "+ name);
        log.info("# email : "+ email);
        log.info("# picture : "+ picture);

        // email을 토대로 Member 객체 만들어서 DB에 저장
        Member member = buildOAuth2Member(name, email, picture);
        Member saveMember = saveMember(member);

        // 얻은 email 주소로 권한 List 만들기
        List<String> authorities = authorityUtils.createRoles(email);

        // 리다이렉트를 하기위한 정보들을 보내줌
        redirect(request,response,saveMember,authorities);
    }
    private Member buildOAuth2Member(String name, String email, String picture){
        return Member.builder()
                .username(name)
                .email(email)
                .password("")
                .location("")
                .aboutMe("")
                .title("")
                .fullname("")
                .image(picture)
                .websiteLink("")
                .twitterLink("")
                .githubLink("")
                .fullname("")
                .build();
    }

    public Member saveMember(Member member){
        return memberService.createMemberOAuth2(member);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {
        // 받은 정보를 토대로 AccessToken, Refresh Token을 만듬
        String accessToken = delegateAccessToken(member, authorities);
        String refreshToken = delegateRefreshToken(member);

        // Token을 토대로 URI를 만들어서 String으로 변환
        String uri = createURI(accessToken, refreshToken).toString();

        // 헤더에 전송해보기
        String headerValue = "Bearer "+ accessToken;
        response.setHeader("Authorization",headerValue); // Header에 등록
        response.setHeader("Refresh",refreshToken); // Header에 등록

        // 만든 URI로 리다이렉트 보냄
        getRedirectStrategy().sendRedirect(request,response,uri);
    }

    private String delegateAccessToken(Member member, List<String> authorities){

        Map<String,Object> claims = new HashMap<>();
        claims.put("roles", member.getRoles());
        claims.put("memberId", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateAccesToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private String delegateRefreshToken(Member member){
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

    private URI createURI(String accessToken, String refreshToken){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
//                .port(80) // 기본 포트가 80이기 때문에 괜찮다
                .path("/receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
