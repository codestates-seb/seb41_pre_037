package com.example.stackoverflowclone.question.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionVoteResponseDto {
        private Long questionId;
        private Long questionVoteCount;
        private boolean success;
}
