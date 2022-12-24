package com.example.stackoverflowclone.question_tag.service;

import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.question_tag.entity.QuestionTag;
import com.example.stackoverflowclone.question_tag.repository.QuestionTagRepository;
import com.example.stackoverflowclone.tag.entity.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionTagService {

    private final QuestionTagRepository questionTagRepository;

}
