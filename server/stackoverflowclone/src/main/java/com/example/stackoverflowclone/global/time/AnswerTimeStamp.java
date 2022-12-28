package com.example.stackoverflowclone.global.time;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
@Component
public class AnswerTimeStamp {
    public String timestamp(List<Answer> answers){
        if (answers.isEmpty()){
            return null;
        }

        Optional<Answer> answer = answers.parallelStream().findAny();
        LocalDateTime date = answer.get().getCreatedAt();
        LocalDateTime now = LocalDateTime.now();

        long min = ChronoUnit.MINUTES.between(date, now);
        long hour = ChronoUnit.HOURS.between(date, now);
        long days = ChronoUnit.DAYS.between(date, now);
        long months = ChronoUnit.MONTHS.between(date, now);
        long years = ChronoUnit.YEARS.between(date, now);

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
            str += min%60+"min ago";
        }

        return str;
    }
}
