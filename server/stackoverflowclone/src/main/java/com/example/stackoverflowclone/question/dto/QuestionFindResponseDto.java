package com.example.stackoverflowclone.question.dto;

import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.tag.entity.Tag;
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
    private List<Tag> tag;
    private List<Answer> answers;
}
