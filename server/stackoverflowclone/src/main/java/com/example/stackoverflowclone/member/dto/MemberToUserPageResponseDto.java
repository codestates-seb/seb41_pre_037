package com.example.stackoverflowclone.member.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberToUserPageResponseDto {
    private Long memberId;
    private String username;
    private String image;
    private String location;
}
