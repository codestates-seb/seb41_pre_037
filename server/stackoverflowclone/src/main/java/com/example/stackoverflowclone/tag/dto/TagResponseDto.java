package com.example.stackoverflowclone.tag.dto;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Builder
public class TagResponseDto {
    private Long tagId;
    private int questionAmount;
    private String tagName;
    private String tagBody;
    private String tagUrl;
}
