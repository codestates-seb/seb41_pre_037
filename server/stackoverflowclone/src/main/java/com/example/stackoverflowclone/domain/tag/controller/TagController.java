package com.example.stackoverflowclone.domain.tag.controller;

import com.example.stackoverflowclone.domain.tag.entity.Tag;
import com.example.stackoverflowclone.domain.tag.mapper.TagMapper;
import com.example.stackoverflowclone.domain.tag.service.TagService;
import com.example.stackoverflowclone.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tags")
public class TagController {

    private final TagService tagService;
    private final TagMapper mapper;

    @GetMapping()
    public ResponseEntity findTags(@Positive @RequestParam(defaultValue = "1", required = false) int page,
                                   @RequestParam(defaultValue = "", required = false) String search) {
        Page<Tag> pageTags = tagService.findTags(search, page - 1, 16);
        List<Tag> tags = pageTags.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.tagToResponseDto(tags), pageTags),
                HttpStatus.OK);
    }
}