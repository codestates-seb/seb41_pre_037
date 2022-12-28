package com.example.stackoverflowclone.global.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true)
                .allowedOriginPatterns("http://3.35.50.33:8080/")
                .allowedOriginPatterns("http://localhost:3000")
                .allowedHeaders("*")
                .allowedMethods("*");
     }
}
