package com.example.stackoverflowclone.domain.question_tag.service;

import com.example.stackoverflowclone.domain.question_tag.repository.QuestionTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class QuestionTagService {

    private final QuestionTagRepository questionTagRepository;

}
