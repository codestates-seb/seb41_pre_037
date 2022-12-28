package com.example.stackoverflowclone.domain.answer.mapper;

import com.example.stackoverflowclone.domain.answer.dto.AnswerPostDto;
import com.example.stackoverflowclone.domain.answer.dto.AnswerResponseDto;
import com.example.stackoverflowclone.domain.answer.dto.AnswerVoteResponseDto;
import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.entity.Question;
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

    public AnswerVoteResponseDto answerToAnswerVoteResponseDto(Answer answer){

        return AnswerVoteResponseDto.builder()
                .answerId(answer.getAnswerId())
                .answerVoteCount(answer.getAnswerVoteCount())
                .build();
    }
}
