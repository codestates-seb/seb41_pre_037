package com.example.stackoverflowclone.domain.tag.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TagResponseDto {
    private Long tagId;
    private int questionAmount;
    private String tagName;
    private String tagBody;
    private String tagUrl;
}
