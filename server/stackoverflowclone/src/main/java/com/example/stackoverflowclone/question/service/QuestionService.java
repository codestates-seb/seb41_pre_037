package com.example.stackoverflowclone.question.service;

import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.question.repository.QuestionRepository;
import com.example.stackoverflowclone.question_tag.entity.QuestionTag;
import com.example.stackoverflowclone.tag.entity.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        /*
         * 리펙토링 포인트 -> Exception 비지니스 예외로직으로 만들 예정
         * */
        return findQuestion.orElseThrow(() ->
                new RuntimeException("질문 게시글을 찾을 수 없습니다."));
    }

//    public Question findAllQuestionswithOneMember(Member member) {
//        Optional<Question> byId = questionRepository.findByMember_MemberId(member.getMemberId());
//        return byId.orElseThrow(() ->
//                new RuntimeException("No!"));
//    }

}
