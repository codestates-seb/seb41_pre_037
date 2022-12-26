package com.example.stackoverflowclone.domain.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@Builder
public class MemberPostDto {

    @NotBlank(message = "Null값과 공백을 허용할 수 없습니다.")
    private String username;

    @NotBlank(message = "Null값과 공백을 허용할 수 없습니다.")
    @Email(message = "email 형식에 맞춰주십시오.")
    private String email;

    @NotBlank(message = "Null값과 공백을 허용할 수 없습니다.")
    @Pattern(message = "'숫자', '문자' 무조건 1개 이상, '최소 8자에서 최대 20자' 허용, !@#$%^&* 특수문자만 허용",
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$")
    private String password;

}
