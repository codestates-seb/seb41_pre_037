package com.example.stackoverflowclone.domain.answer.service;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.answer.repository.AnswerRepository;
import com.example.stackoverflowclone.global.exception.BusinessLogicException;
import com.example.stackoverflowclone.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public Answer postAnswer(Answer answer){
        return answerRepository.save(answer);
    }
    public Answer findAnswer(Long answerId){
        Optional<Answer> findAnswer = answerRepository.findById(answerId);
        return findAnswer.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }
    public String timestamp(Answer answer){

        // 답변
        LocalDateTime now = LocalDateTime.now(); // 현재시간
//        LocalDateTime date = LocalDateTime.of(2022,12,25,0,0,0); // 생성시간 테스트
        LocalDateTime date =  answer.getCreatedAt();
        long min = ChronoUnit.MINUTES.between(date, now);
        long hour = ChronoUnit.HOURS.between(date, now);
        long days = ChronoUnit.DAYS.between(date, now);
        long months = ChronoUnit.MONTHS.between(date, now);
        long years = ChronoUnit.YEARS.between(date, now);

        // System.out.println("================= 답변 =================");
        String str = "asked ";
        if (years%100 != 0){
            str += years%100+" years";
        }else if(months%12 != 0){
            str += months%12 + " month";
        }else if (days%30 != 0){
            str += days%30+" days";
        }else if (hour%24 != 0){
            str += hour%24 + " hour";
        }else{
            str += min%60+" ago";
        }
        // System.out.println("답변 단 시간 = "+str);
        return str;
    }
}
