package com.example.stackoverflowclone.domain.member.dto;

import lombok.*;

@Data
@Builder
public class MemberPostDto {
    private String username;
    private String email;
    private String password;

}
