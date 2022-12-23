package com.example.stackoverflowclone.answer.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnswerPostDto {
    private String answerContent;
}
