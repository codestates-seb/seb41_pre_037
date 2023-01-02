package com.example.stackoverflowclone.global.security.auth.loginresolver;

import com.example.stackoverflowclone.global.security.auth.dto.TokenPrincipalDto;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/*
* WebConfig에서 addArgumentResolvers(); 메서드에 추가할 것
* */
public class LoginMemberEmailResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {

        boolean hasLoginMemberEmailAnnotation = parameter.hasParameterAnnotation(LoginMemberEmail.class);
        boolean hasLongType = String.class.isAssignableFrom(parameter.getParameterType());
        return hasLoginMemberEmailAnnotation && hasLongType;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal == "anonymousUser") {
            return -1L;
        }

        TokenPrincipalDto castedPrincipal = (TokenPrincipalDto) principal;

        return castedPrincipal.getEmail();
    }
}
