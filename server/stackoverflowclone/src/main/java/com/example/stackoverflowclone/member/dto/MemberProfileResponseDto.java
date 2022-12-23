package com.example.stackoverflowclone.member.dto;

import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.audit.Auditable;
import com.example.stackoverflowclone.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Queue;

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
