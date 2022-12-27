package com.example.stackoverflowclone.domain.question.service;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.repository.QuestionRepository;
import com.example.stackoverflowclone.domain.tag.service.TagService;
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

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final TagService tagService;

    public Question postQuestion(Question question) {
        return questionRepository.save(question);
    }

    public void deleteQuestion(Long questionId, Long memberId) {
        Question question = findQuestion(questionId);

        Long compareMemberId = question.getMember().getMemberId();
        if(memberId != compareMemberId) {
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

    public Page<Question> findAllQuestionsByPage(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }

    public Page<Question> findAllQuestionsSortedByUnanswered(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return questionRepository.findAllByAnswersEmpty(pageable);
    }

    public Page<Question> findAllQuestionsRelatedToUserSearch(String q, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("questionId").descending());
        return questionRepository.findAllByQuestionTitleContainsIgnoreCaseOrQuestionProblemBodyContainsIgnoreCase(q,q,pageable);
    }

//    public Page<Question> findAllQuestionsSortedByTagged(String tagName, int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        return questionRepository.findAllByQuestionTagListContainingIgnoreCase(tagName, pageable);
//    }

    public Page<Question> findAllQuestionsSortedByUserId(Long memberId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("questionId").descending());
        return questionRepository.findAllByMemberMemberId(memberId, pageable);
    }

    public String timestamp(Question question){
        // 질문
        LocalDateTime now = LocalDateTime.now(); // 현재시간
//        LocalDateTime date = LocalDateTime.of(2022,12,25,23,0,0); // 생성시간 테스트
        LocalDateTime date =  question.getCreatedAt(); //실제 생성시간
        long min = ChronoUnit.MINUTES.between(date, now);
        long hour = ChronoUnit.HOURS.between(date, now);
        long days = ChronoUnit.DAYS.between(date, now);
        long months = ChronoUnit.MONTHS.between(date, now);
        long years = ChronoUnit.YEARS.between(date, now);

        System.out.println("================= 질문 =================");
        String str = "";
        if (years%100 != 0){
            str += years%100+"years, ";
        }
        if(months%12 != 0){
            str += months%12 + "month, "; //Member for 9 years, 8 months
        }
        if (days%30 != 0){
            str += days%30+"days, ";
        }
        if (hour%24 != 0){
            str += hour%24 + "hour, ";
        }
        str += min%60+"ago";
        System.out.println("질문 단 시간 = "+str);
        System.out.println("========================================");
        return str;
    }
    public String timestampmodified(Question question){
        // 질문
        LocalDateTime now = LocalDateTime.now(); // 현재시간
//        LocalDateTime date = LocalDateTime.of(2022,12,25,23,0,0); // 생성시간 테스트
        LocalDateTime date =  question.getModifiedAt(); //실제 생성시간
        long min = ChronoUnit.MINUTES.between(date, now);
        long hour = ChronoUnit.HOURS.between(date, now);
        long days = ChronoUnit.DAYS.between(date, now);
        long months = ChronoUnit.MONTHS.between(date, now);
        long years = ChronoUnit.YEARS.between(date, now);

        System.out.println("================= 질문 수정 =================");
        String str = "";
        if (years%100 != 0){
            str += years%100+"years,";
        }
        if(months%12 != 0){
            str += months%12 + "month,"; //Member for 9 years, 8 months
        }
        if (days%30 != 0){
            str += days%30+"days,";
        }
        if (hour%24 != 0){
            str += hour%24 + "hour,";
        }
        str += min%60+" ago";
        System.out.println("질문 단 시간 = "+str);
        System.out.println("========================================");
        return str;
    }
}
