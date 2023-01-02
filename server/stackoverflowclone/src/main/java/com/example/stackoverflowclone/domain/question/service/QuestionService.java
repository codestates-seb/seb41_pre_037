package com.example.stackoverflowclone.domain.question.service;

import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.repository.QuestionRepository;
import com.example.stackoverflowclone.global.exception.BusinessLogicException;
import com.example.stackoverflowclone.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class QuestionService {
    private final QuestionRepository questionRepository;

    public Question postQuestion(Question question) {
        return questionRepository.save(question);
    }

    public void deleteQuestion(Long questionId, Long memberId) {
        Question question = findQuestion(questionId);

        Long compareMemberId = question.getMember().getMemberId();
        if (memberId != compareMemberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOW);
        }
        questionRepository.delete(question);
    }

    public Question findQuestion(Long questionId) {
        Optional<Question> findQuestion = questionRepository.findById(questionId);
        return findQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    public void addViewCount(Question question) {
        question.setQuestionViewCount(question.getQuestionViewCount() + 1);
    }

    public Page<Question> findAllQuestions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("questionId").descending());
        return questionRepository.findAll(pageable);
    }

    public Page<Question> findAllQuestions(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("questionId").descending());
        return questionRepository.findAllByQuestionTitleContainsIgnoreCaseOrQuestionProblemBodyContainsIgnoreCase(search, search, pageable);
    }

    public Page<Question> findAllQuestions(Long memberId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("questionId").descending());
        return questionRepository.findAllByMemberMemberId(memberId, pageable);
    }

    public Page<Question> findAllUnansweredQuestions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return questionRepository.findAllByAnswersEmpty(pageable);
    }
}
