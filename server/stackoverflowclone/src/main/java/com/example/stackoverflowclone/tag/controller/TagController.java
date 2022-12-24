package com.example.stackoverflowclone.tag.controller;

import com.example.stackoverflowclone.audit.Auditable;
import com.example.stackoverflowclone.response.DataResponseDto;
import com.example.stackoverflowclone.response.MultiResponseDto;
import com.example.stackoverflowclone.tag.entity.Tag;
import com.example.stackoverflowclone.tag.mapper.TagMapper;
import com.example.stackoverflowclone.tag.service.TagService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.event.AuthenticationFailureDisabledEvent;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;
    private final TagMapper mapper;

    @GetMapping
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