package com.example.stackoverflowclone.domain.answer.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AnswerByMemberDto {

    private Long answerId;
    private String answerTitle;
    private LocalDateTime answerCreatedAt;
    private Long answerVoteCount;

}
