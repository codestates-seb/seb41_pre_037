package com.example.stackoverflowclone.question.controller;


import com.example.stackoverflowclone.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.question.mapper.QuestionMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionMapper questionMapper;

    @PostMapping("/ask/post")
    public ResponseEntity postQuestion(@RequestBody QuestionPostDto questionPostDto){
        log.info("postQuestionDto.getQuestionTitle = {}", questionPostDto.getQuestionTitle());
        log.info("postQuestionDto.getQuestionProblemBody = {}", questionPostDto.getQuestionProblemBody());
        log.info("postQuestionDto.getQuestionTryOrExpectingBody = {}", questionPostDto.getQuestionTryOrExpectingBody());
        log.info("postQuestionDto.getTag = {}", questionPostDto.getTag  ());

        Question question = questionMapper.postQuestionDtoToQuestion(questionPostDto);


        return new ResponseEntity(HttpStatus.CREATED);
    }


    @GetMapping("/{question-id}/{question-title}")
    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId,
                                      @PathVariable("question-title") String questionTitle){
        log.info("question-id = {}", questionId);
        log.info("question-title = {}", questionTitle);

        return new ResponseEntity(HttpStatus.OK);
    }


}
