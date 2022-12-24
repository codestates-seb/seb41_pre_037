package com.example.stackoverflowclone.domain.answer.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnswerResponseDto {
    private Long answerId;
    private String answerContent;
}
