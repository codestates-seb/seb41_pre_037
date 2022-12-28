package com.example.stackoverflowclone.domain.question.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionFindResponseDto {
    private Long questionId;
    private Long memberId ;
    private String username;
    private String image;
    private String questionTitle;
    private String questionCreatedAt;
    private String questionModifiedAt;
    private Long questionVoteCount;
    private Long questionViewCount;
    private String questionProblemBody;
    private String questionTryOrExpectingBody;
    private List<QuestionTagResponseDto> tag;
    private List<QuestionFindAnswerDto> answers;
}
