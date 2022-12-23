package com.example.stackoverflowclone.answer.controller;

import com.example.stackoverflowclone.answer.dto.AnswerPostDto;
import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.answer.mapper.AnswerMapper;
import com.example.stackoverflowclone.answer.service.AnswerService;
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
    @PostMapping("/{question-id}")
    public ResponseEntity<DataResponseDto> createAnswer(@PathVariable("question-id") Long questionId,
                                                        @RequestBody AnswerPostDto answerPostDto){

        System.out.println("in");
        Question question = questionService.findQuestion(questionId);
        Answer answer = answerMapper.answerPostDtoToAnswer(answerPostDto, question);
        Answer saveAnswer = answerService.postAnswer(answer);

        return new ResponseEntity(new DataResponseDto<>(answerMapper.answerToAnswerResponseDto(saveAnswer)), HttpStatus.CREATED);
    }

}
