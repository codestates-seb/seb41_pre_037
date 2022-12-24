package com.example.stackoverflowclone.domain.member.dto;

import lombok.*;
@Data
@Builder
public class MemberPostResponseDto {
    private Long memberId;
    private String username;
    private String email;

}
