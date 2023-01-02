package com.example.stackoverflowclone.domain.tag.mapper;

import com.example.stackoverflowclone.domain.tag.entity.Tag;
import com.example.stackoverflowclone.domain.tag.dto.TagResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class TagMapper {

    public List<TagResponseDto> tagToResponseDto(List<Tag> tags) {
        if (tags == null) {
            return null;
        }

        return tags.stream()
                .map(tag -> {
                    return TagResponseDto.builder()
                            .tagId(tag.getTagId())
                            .questionAmount(tag.getQuestionTags().size())
                            .tagName(tag.getTagName())
                            .tagBody(tag.getTagBody())
                            .tagUrl(tag.getTagUrl())
                            .build();
                })
                .collect(Collectors.toList());
    }
}