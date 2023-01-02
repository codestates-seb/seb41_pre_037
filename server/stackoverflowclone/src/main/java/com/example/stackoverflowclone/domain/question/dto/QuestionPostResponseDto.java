package com.example.stackoverflowclone.domain.question.dto;

import com.example.stackoverflowclone.domain.tag.entity.Tag;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionPostResponseDto {
    private Long questionId;
    private String questionTitle;
    private String questionProblemBody;
    private String questionTryOrExpectingBody;
    private List<QuestionTagResponseDto> tag;
}
