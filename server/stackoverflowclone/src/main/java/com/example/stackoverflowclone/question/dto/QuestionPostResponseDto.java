package com.example.stackoverflowclone.question.dto;

import com.example.stackoverflowclone.tag.entity.Tag;
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
    private List<Tag> tag;
}
