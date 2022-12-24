package com.example.stackoverflowclone.domain.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class TagPostDto {

    private String tagName;
    private String tagBody;
    private String tagUrl;
}
