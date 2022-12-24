package com.example.stackoverflowclone.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class MemberProfileResponseDto{
    private Long memberId;
    private LocalDateTime profileCreatedAt;
    private String username;
    private String email;
    private String location;
    private String title;
    private String aboutMe;
    private String image;
    private String websiteLink;
    private String twitterLink;
    private String githubLink;
    private String fullname;

}
