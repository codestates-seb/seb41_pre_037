package com.example.stackoverflowclone.global.security.auth.handler;

import com.example.stackoverflowclone.global.security.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);

        // log.info("request.getMethod() = {}", request.getMethod()); //GET
        // log.info("request.getProtocol() = {}", request.getProtocol()); // HTTP/1.1
        // log.info("request.getScheme() = {}", request.getScheme()); //http
        // log.info("request.getRequestURL() = {}", request.getRequestURL());

        // ServletInputStream inputStream = request.getInputStream();
        // String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);

        // log.info("messageBody = {}", messageBody);

        // log.info("==== Header 정보 시작 ====");
        // request.getHeaderNames().asIterator()
        //         .forEachRemaining(headerName -> System.out.println(headerName + " : " + headerName));

        logExceptionMessage(authException, exception);
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception){
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Unauthorized error happened: {}", message);
    }
}
