package com.example.stackoverflowclone.answer.mapper;

import com.example.stackoverflowclone.answer.dto.AnswerPostDto;
import com.example.stackoverflowclone.answer.dto.AnswerResponseDto;
import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.question.entity.Question;
import org.springframework.stereotype.Component;

@Component
public class AnswerMapper {

    public Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto, Question question){
        Member member = new Member(); // 테스트 용도 시큐리티 완료후 삭제 예정
        member.setMemberId(1L); // 테스트 용도 시큐리티 완료후 삭제 예정

        return Answer.builder()
                .answerContent(answerPostDto.getAnswerContent())
                .answerVoteCount(0)
                .question(question)
                .member(member) // 리펙토리 포인트 (시큐리티 연결시)
                .build();
    }

    public AnswerResponseDto answerToAnswerResponseDto(Answer answer){
        return AnswerResponseDto.builder()
                .answerId(answer.getAnswerId())
                .answerContent(answer.getAnswerContent())
                .build();
    }
}
