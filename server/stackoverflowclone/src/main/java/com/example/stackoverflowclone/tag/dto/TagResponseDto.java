package com.example.stackoverflowclone.tag.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TagResponseDto {
    private Long tagId;
    private int questionAmount;
    private String tagName;
    private String tagBody;
    private String tagUrl;


}
