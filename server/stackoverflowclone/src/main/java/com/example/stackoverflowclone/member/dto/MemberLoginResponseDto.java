package com.example.stackoverflowclone.member.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberLoginResponseDto {
    private Long memberId;
    private String email;
    private String image;
}
