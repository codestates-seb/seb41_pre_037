package com.example.stackoverflowclone.tag.service;

import com.example.stackoverflowclone.tag.entity.Tag;
import com.example.stackoverflowclone.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import com.example.stackoverflowclone.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.question_tag.entity.QuestionTag;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public Page<Tag> findTags(int page, int size) {
        return tagRepository.findAll(PageRequest.of(page, size, Sort.by("tagId").descending()));
    }
    public List<Tag> findTags(QuestionPostDto questionPostDto){
        return questionPostDto.getTag().stream()
                .map(tag -> {
                    return findTag(tag.getTagName());
                })
                .collect(Collectors.toList());
    }

    public List<Tag> findTags(List<QuestionTag> questionTagList){

        return questionTagList.stream()
                .map(questionTag -> {
                    Optional<Tag> findTag = tagRepository.findById(questionTag.getTag().getTagId());
                    return findTag.orElseThrow(() ->
                            new RuntimeException("Tag를 찾을 수 없습니다."));

                })
                .collect(Collectors.toList());
    }

    public Tag findTag(String tagName){
        Optional<Tag> findTagName = tagRepository.findByTagName(tagName);
        /*
        * 리펙토링 포인트 -> Exception 비지니스 예외로직으로 만들 예정
        * */
        return findTagName.orElseThrow(() ->
                new RuntimeException("TagName을 찾을 수 없습니다."));
    }
}
