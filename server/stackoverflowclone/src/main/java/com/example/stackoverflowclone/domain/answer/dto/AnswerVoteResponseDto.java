package com.example.stackoverflowclone.domain.answer.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnswerVoteResponseDto {
        private Long answerId;
        private Long answerVoteCount;
}
