package com.example.stackoverflowclone.global.time;

import com.example.stackoverflowclone.domain.member.entity.Member;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Component
public class MemberTimeStamp {
    public String timestamp(Member member) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime date = member.getCreatedAt();
        long days = ChronoUnit.DAYS.between(date, now);
        long months = ChronoUnit.MONTHS.between(date, now);
        long years = ChronoUnit.YEARS.between(date, now);

        String str = "member for ";
        if (years % 100 != 0) {
            str += years % 100 + " years";
        }
        if (months % 12 != 0) {
            str += months % 12 + " month";
        }
        str += days % 30 + " days";

        return str;
    }
}
