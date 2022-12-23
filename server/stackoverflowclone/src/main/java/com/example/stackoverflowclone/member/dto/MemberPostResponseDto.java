package com.example.stackoverflowclone.member.dto;

import lombok.*;
@Data
@Builder
public class MemberPostResponseDto {
    private Long memberId;
    private String username;
    private String email;

}
