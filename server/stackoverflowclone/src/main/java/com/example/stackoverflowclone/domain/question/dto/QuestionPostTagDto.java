package com.example.stackoverflowclone.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class QuestionPostTagDto {
    private String tagName;
}
