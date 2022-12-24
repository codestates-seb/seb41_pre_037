package com.example.stackoverflowclone.answer.mapper;

import com.example.stackoverflowclone.answer.dto.AnswerPostDto;
import com.example.stackoverflowclone.answer.dto.AnswerResponseDto;
import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.question.entity.Question;
import org.springframework.stereotype.Component;

@Component
public class AnswerMapper {

    public Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto, Question question, Member member){

        return Answer.builder()
                .answerContent(answerPostDto.getAnswerContent())
                .answerVoteCount(0)
                .question(question)
                .member(member)
                .build();
    }

    public AnswerResponseDto answerToAnswerResponseDto(Answer answer){
        return AnswerResponseDto.builder()
                .answerId(answer.getAnswerId())
                .answerContent(answer.getAnswerContent())
                .build();
    }
}
