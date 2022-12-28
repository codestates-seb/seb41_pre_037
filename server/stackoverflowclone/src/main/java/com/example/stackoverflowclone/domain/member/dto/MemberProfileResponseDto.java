package com.example.stackoverflowclone.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class MemberProfileResponseDto{
    @Positive
    private Long memberId;
    private String profileCreatedAt;
    @Pattern(regexp = "^\\S+(\\s?\\S+)*$")
    @NotBlank( message = "회원 이름은 공백이 아니여야한다.")
    private String username;
    @Email
    @Pattern(regexp = "\\w+@\\w+\\.\\w+(\\.\\w+)?")
    @NotBlank(message = "이메일은 공백이 아니여야 합니다.")
    private String email;
    private String location;
    private String title;
    private String aboutMe;
    private String image;
    private String websiteLink;
    private String twitterLink;
    private String githubLink;
    private String fullname;
    private Long questions;
    private Long answers;

}
