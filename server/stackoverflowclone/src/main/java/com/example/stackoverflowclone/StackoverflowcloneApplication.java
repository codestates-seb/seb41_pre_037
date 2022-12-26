package com.example.stackoverflowclone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class StackoverflowcloneApplication {

    public static void main(String[] args) {
        SpringApplication.run(StackoverflowcloneApplication.class, args);
    }

}
