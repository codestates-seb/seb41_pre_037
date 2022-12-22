package com.example.stackoverflowclone.question.dto;

import com.example.stackoverflowclone.tag.entity.Tag;
import lombok.Data;

import java.util.List;

@Data
public class QuestionPostDto {
    private String questionTitle;
    private String questionProblemBody;
    private String questionTryOrExpectingBody;
    private List<Tag> tag;
}
