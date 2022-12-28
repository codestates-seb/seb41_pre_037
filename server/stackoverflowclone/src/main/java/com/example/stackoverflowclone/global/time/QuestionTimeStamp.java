package com.example.stackoverflowclone.global.time;

import com.example.stackoverflowclone.domain.question.entity.Question;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
@Component
public class QuestionTimeStamp {
    public String timestamp(Question question){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime date =  question.getCreatedAt();
        long min = ChronoUnit.MINUTES.between(date, now);
        long hour = ChronoUnit.HOURS.between(date, now);
        long days = ChronoUnit.DAYS.between(date, now);
        long months = ChronoUnit.MONTHS.between(date, now);
        long years = ChronoUnit.YEARS.between(date, now);

        String str = "";
        if (years%100 != 0){
            str += years%100+"years, ";
        }
        if(months%12 != 0){
            str += months%12 + "month, ";
        }
        if (days%30 != 0){
            str += days%30+"days, ";
        }
        if (hour%24 != 0){
            str += hour%24 + "hour, ";
        }
        str += min%60+"min ago";
        return str;
    }
    public String timestampmodified(Question question){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime date =  question.getModifiedAt();
        long min = ChronoUnit.MINUTES.between(date, now);
        long hour = ChronoUnit.HOURS.between(date, now);
        long days = ChronoUnit.DAYS.between(date, now);
        long months = ChronoUnit.MONTHS.between(date, now);
        long years = ChronoUnit.YEARS.between(date, now);

        String str = "";
        if (years%100 != 0){
            str += years%100+"years,";
        }
        if(months%12 != 0){
            str += months%12 + "month,";
        }
        if (days%30 != 0){
            str += days%30+"days,";
        }
        if (hour%24 != 0){
            str += hour%24 + "hour,";
        }
        str += min%60+" ago";

        return str;
    }
}
