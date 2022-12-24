package com.example.stackoverflowclone.answer.controller;

import com.example.stackoverflowclone.answer.dto.AnswerPostDto;
import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.answer.mapper.AnswerMapper;
import com.example.stackoverflowclone.answer.service.AnswerService;
import com.example.stackoverflowclone.global.security.auth.loginresolver.LoginMemberId;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.member.service.MemberService;
import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.question.service.QuestionService;
import com.example.stackoverflowclone.response.DataResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
public class AnswerController {

    private final AnswerService answerService;
    private final AnswerMapper answerMapper;
    private final QuestionService questionService;
    private final MemberService memberService;

    @PostMapping("/{question-id}")
    public ResponseEntity<DataResponseDto> createAnswer(@LoginMemberId Long memberId,
                                                        @PathVariable("question-id") Long questionId,
                                                        @RequestBody AnswerPostDto answerPostDto){

        Member member = memberService.findByMember(memberId);
        Question question = questionService.findQuestion(questionId);
        Answer answer = answerMapper.answerPostDtoToAnswer(answerPostDto, question, member);
        Answer saveAnswer = answerService.postAnswer(answer);

        return new ResponseEntity(new DataResponseDto<>(answerMapper.answerToAnswerResponseDto(saveAnswer)), HttpStatus.CREATED);
    }

}
