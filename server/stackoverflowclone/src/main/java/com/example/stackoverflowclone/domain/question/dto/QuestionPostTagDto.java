package com.example.stackoverflowclone.domain.question.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuestionPostTagDto {
    private String tagName;
}
