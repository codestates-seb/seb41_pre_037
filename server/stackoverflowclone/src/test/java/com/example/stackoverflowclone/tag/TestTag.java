package com.example.stackoverflowclone.tag;

import com.example.stackoverflowclone.tag.dto.TagResponseDto;
import com.example.stackoverflowclone.tag.entity.Tag;
import com.example.stackoverflowclone.tag.mapper.TagMapper;
import com.example.stackoverflowclone.tag.service.TagService;
import org.junit.jupiter.api.Test;


public class TestTag {

    public void shouldMapTagToDto() {
        // given
        Tag tag = new Tag(1L, "C", "Clang", "");

        TagResponseDto tagResponseDto = TagMapper.INSTANCE.tagToTagResponseDto(tag);

    }

}
