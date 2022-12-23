package com.example.stackoverflowclone.tag.mapper;

import com.example.stackoverflowclone.question_tag.entity.QuestionTag;
import com.example.stackoverflowclone.tag.dto.TagPostDto;
import com.example.stackoverflowclone.tag.dto.TagResponseDto;
import com.example.stackoverflowclone.tag.entity.Tag;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;


@Component
@RequiredArgsConstructor
public class TagMapper {

    public List<TagResponseDto> tagToResponseDto(List<Tag> tags) {
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