package com.example.stackoverflowclone.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class QuestionPostTagDto {
    private Long tagId;
    private String tagName;
}
