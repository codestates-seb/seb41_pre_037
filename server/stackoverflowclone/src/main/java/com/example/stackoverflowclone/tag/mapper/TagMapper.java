package com.example.stackoverflowclone.tag.mapper;

import com.example.stackoverflowclone.tag.dto.TagPostDto;
import com.example.stackoverflowclone.tag.dto.TagResponseDto;
import com.example.stackoverflowclone.tag.entity.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    TagMapper INSTANCE = Mappers.getMapper(TagMapper.class);

    Tag tagPostDtoToTag(TagPostDto tagPostDto);
    TagResponseDto tagToTagResponseDto(Tag tag);
    List<TagResponseDto> tagsToTagResponseDtos(List<Tag> tags);


}
