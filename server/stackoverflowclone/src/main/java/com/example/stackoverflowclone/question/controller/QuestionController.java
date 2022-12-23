package com.example.stackoverflowclone.question.controller;


import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.answer.service.AnswerService;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.member.service.MemberService;
import com.example.stackoverflowclone.question.dto.QuestionFindResponseDto;
import com.example.stackoverflowclone.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.question.dto.QuestionPostResponseDto;
import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.question.mapper.QuestionMapper;
import com.example.stackoverflowclone.question.service.QuestionService;
import com.example.stackoverflowclone.question_tag.entity.QuestionTag;
import com.example.stackoverflowclone.question_tag.service.QuestionTagService;
import com.example.stackoverflowclone.response.DataResponseDto;
import com.example.stackoverflowclone.tag.entity.Tag;
import com.example.stackoverflowclone.tag.repository.TagRepository;
import com.example.stackoverflowclone.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final MemberService memberService;
    private final TagService tagService;
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    private final QuestionTagService questionTagService;

    private final AnswerService answerService;

    @PostMapping("/ask/post")
    public ResponseEntity<DataResponseDto> postQuestion(@RequestBody QuestionPostDto questionPostDto){

        List<Tag> tagList = tagService.findTags(questionPostDto);
        Member member = memberService.findMemberEmail(questionPostDto.getEmail());
        Question question = questionService.postQuestion(questionMapper.postQuestionDtoToQuestion(questionPostDto, tagList,member));

        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionTagListToQuestionPostResponseDto(question,tagList)),HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}/{question-title}")
    public ResponseEntity<DataResponseDto> findQuestion(@PathVariable("question-id") Long questionId,
                                                        @PathVariable("question-title") String questionTitle){

        Question question = questionService.findQuestion(questionId);
        List<QuestionTag> questionTagList = question.getQuestionTagList();
        List<Tag> tagList = tagService.findTags(questionTagList);
        List<Answer> answers = question.getAnswers();
        Member member = question.getMember();

        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionInfoToQuestionFindResponseDto(question,member,tagList,answers)),HttpStatus.OK);
    }


}
