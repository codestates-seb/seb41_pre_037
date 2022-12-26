package com.example.stackoverflowclone.domain.tag.controller;

import com.example.stackoverflowclone.domain.tag.entity.Tag;
import com.example.stackoverflowclone.domain.tag.mapper.TagMapper;
import com.example.stackoverflowclone.domain.tag.service.TagService;
import com.example.stackoverflowclone.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;
    private final TagMapper mapper;

    @GetMapping("/main")
    public ResponseEntity findTags() {
        Page<Tag> pageTags = tagService.findTags(0, 15);
        List<Tag> tags = pageTags.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.tagToResponseDto(tags), pageTags),
                HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity findTags(@Positive @RequestParam int page) {
        Page<Tag> pageTags = tagService.findTags(page - 1, 15);
        List<Tag> tags = pageTags.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.tagToResponseDto(tags), pageTags),
                HttpStatus.OK);
    }
}