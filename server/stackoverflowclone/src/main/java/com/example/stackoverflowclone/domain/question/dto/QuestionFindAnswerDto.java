package com.example.stackoverflowclone.domain.question.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionFindAnswerDto {
    private Long answerId;
    private String answerCreatedAt;
    private String answerContent;
    private Long answerVoteCount;
    private Long memberId;
    private String username;
    private String image;
}
