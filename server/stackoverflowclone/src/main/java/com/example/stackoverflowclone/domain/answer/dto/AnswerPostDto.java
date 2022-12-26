package com.example.stackoverflowclone.domain.answer.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AnswerPostDto {
    @NotBlank(message = "Null값과 공백을 허용할 수 없습니다.")
    private String answerContent;
}
