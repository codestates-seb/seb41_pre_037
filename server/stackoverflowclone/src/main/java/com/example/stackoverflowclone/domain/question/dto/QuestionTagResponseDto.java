package com.example.stackoverflowclone.domain.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionTagResponseDto {
    private Long tagId;
    private String tagName;
    private String tagBody;
    private String tagUrl;
}
