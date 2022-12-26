package com.example.stackoverflowclone.domain.question.service;

import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.repository.QuestionRepository;
import com.example.stackoverflowclone.global.exception.BusinessLogicException;
import com.example.stackoverflowclone.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class QuestionService {
    private final QuestionRepository questionRepository;

    public Question postQuestion(Question question){
        return questionRepository.save(question);
    }
    public Question findQuestion(Long questionId){
        Optional<Question> findQuestion = questionRepository.findById(questionId);
        return findQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    public void addViewCount(Question question){
        question.setQuestionViewCount(question.getQuestionViewCount() + 1);
    }

//    public Question findAllQuestionswithOneMember(Member member) {
//        Optional<Question> byId = questionRepository.findByMember_MemberId(member.getMemberId());
//        return byId.orElseThrow(() ->
//                new RuntimeException("No!"));
//    }

}
