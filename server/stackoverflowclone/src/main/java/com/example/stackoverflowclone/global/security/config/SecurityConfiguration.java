package com.example.stackoverflowclone.global.security.config;

import com.example.stackoverflowclone.domain.member.service.MemberService;
import com.example.stackoverflowclone.global.security.auth.filter.JwtAuthenticationFilter;
import com.example.stackoverflowclone.global.security.auth.filter.JwtVerificationFilter;
import com.example.stackoverflowclone.global.security.auth.handler.*;
import com.example.stackoverflowclone.global.security.auth.jwt.JwtTokenizer;
import com.example.stackoverflowclone.global.security.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
//@EnableWebSecurity(debug = true)
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;
    private final CorsFilter corsFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                // .cors(Customizer.withDefaults()) // corsConfigurationSource라는 이름으로 등록된 Bean을 사용한다고 정의
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 정책 추가 (JWT사용으로 STATELESS로 설정)
                .and()
                .formLogin().disable() // CSR 방식사용으로 formLogin 비활성화
                .httpBasic().disable() // UsernamePasswordAuthenticationFilter 등 비활성화
                .exceptionHandling() // 예외처리 기능이 작동
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 인증 실패시 처리
                .accessDeniedHandler(new MemberAccessDeniedHandler()) // 인증 실패시 처리
                .and()
                .apply(new CustomFilterConfigurer()) // 커스터마이징한 필터를 추가할 수 있음
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/users/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/users").permitAll()
                        .antMatchers(HttpMethod.GET, "/users/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/users/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/users/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/questions/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/tags/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/tags/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/tags/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/tags/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/answers/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.GET, "/answers/**").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/answers/**").hasAnyRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/answers/**").hasAnyRole("USER")
                        .anyRequest().permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberService))
                );
        return http.build();
    }

//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
//    }

//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("*")); // 스크림트 기반의 HTTP 통신을 허용
//        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE")); // HTTP Method에 대한 HTTP 통신 허용
//        configuration.addAllowedHeader("*");
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); // CorsConfigurationSource 구현체 생성
//        source.registerCorsConfiguration("/**", configuration); // 모든 URL에 정책 적용
//        return source;
//    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer,HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class); // AuthenticationManager 객체얻기

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer); // JwtAuthenticationFilter 객체만들기 (생성하면서 DI하기)

            // 상속받은 AbstractAuthenticationProcessingFilter 클래스의 FilterProcessesUrl 설정해주기 (설정안할시 default: /Login)
            // 즉, 로그인 요청할때 이 Url로 요청해야함, 우리가 기존에 UsernamePassword 필터 사용시에는 /process_login 하던부분임
            jwtAuthenticationFilter.setFilterProcessesUrl("/users/login");
            // Exception 추가
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            // Spring Security FilterChain에 추가
            builder
                    .addFilter(corsFilter)
                    .addFilter(jwtAuthenticationFilter)  // 우리가만든 jwtAuthenticationFilter 필터추가
                    // .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class); //  jwtVerificationFilter 필터추가, 뒤에 클래스는 어느클래스 다음에 실행할지 설정
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }

}
