package com.example.stackoverflowclone.domain.question.service;

import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.repository.QuestionRepository;
import com.example.stackoverflowclone.global.exception.BusinessLogicException;
import com.example.stackoverflowclone.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
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
    public List<Question> findMemberQuestion(Member member){ // 추가
//        List<Question> questions = questionRepository.findByMemberQuestion(member);


        log.info("memberId = {}",member.getMemberId());
//        log.info("memberId 가 들어간 질문 = {}",Collections.frequency(questions.get(1L),member.getMemberId())); // Question == 1 비교 x
//        return questions;

        return null;
    }
}
