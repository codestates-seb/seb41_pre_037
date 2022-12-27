package com.example.stackoverflowclone.domain.question.controller;


import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.member.service.MemberService;
import com.example.stackoverflowclone.domain.question.dto.QuestionFindAnswerDto;
import com.example.stackoverflowclone.domain.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.mapper.QuestionMapper;
import com.example.stackoverflowclone.domain.question.service.QuestionService;
import com.example.stackoverflowclone.domain.question_tag.entity.QuestionTag;
import com.example.stackoverflowclone.global.response.MultiResponseDto;
import com.example.stackoverflowclone.global.security.auth.loginresolver.LoginMemberId;
import com.example.stackoverflowclone.global.response.DataResponseDto;
import com.example.stackoverflowclone.domain.tag.entity.Tag;
import com.example.stackoverflowclone.domain.tag.service.TagService;
import com.example.stackoverflowclone.domain.vote.service.QuestionVoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final MemberService memberService;
    private final TagService tagService;
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final QuestionVoteService questionVoteService;


    @PostMapping("/ask/post")
    public ResponseEntity<DataResponseDto> createQuestion(@LoginMemberId Long memberId,
                                                          @RequestBody @Valid QuestionPostDto questionPostDto) {

        log.info("memberId = {}", memberId);
        List<Tag> tagList = tagService.findTags(questionPostDto);
        Member member = memberService.findByMember(memberId);
        Question question = questionService.postQuestion(questionMapper.postQuestionDtoToQuestion(questionPostDto, tagList, member));
        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionTagListToQuestionPostResponseDto(question, tagList)), HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}/{question-title}")
    public ResponseEntity<DataResponseDto> findQuestion(@LoginMemberId Long memberId,
                                                        @PathVariable("question-id") Long questionId,
                                                        @PathVariable("question-title") String questionTitle) {

        Question question = questionService.findQuestion(questionId);
        questionService.addViewCount(question);
        List<QuestionTag> questionTagList = question.getQuestionTagList();
        List<Tag> tagList = tagService.findTags(questionTagList);
        List<Answer> answers = question.getAnswers();
        List<QuestionFindAnswerDto> questionFindAnswerDto = questionMapper.answersToQuestionFindAnswerDto(answers);
        Member member = question.getMember();

        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionInfoToQuestionFindResponseDto(question, member, tagList, questionFindAnswerDto)), HttpStatus.OK);
    }

    @PostMapping("/{question-id}/vote/2")
    public ResponseEntity<DataResponseDto> questionUpVote(@LoginMemberId Long memberId,
                                                          @PathVariable("question-id") Long questionId) {
        Member member = memberService.findByMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionVoteService.increaseVote(member, question);

        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionToQuestionVoteResponseDto(question)), HttpStatus.OK);
    }

    @PostMapping("/{question-id}/vote/3")
    public ResponseEntity<DataResponseDto> questionDownVote(@LoginMemberId Long memberId,
                                                            @PathVariable("question-id") Long questionId) {
        Member member = memberService.findByMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionVoteService.decreaseVote(member, question);

        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionToQuestionVoteResponseDto(question)), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity getHome(@Positive @RequestParam(defaultValue = "1", required = false) int page) {

        Page<Question> listPage = questionService.findAllQuestionsByPage(page - 1, 15);
        List<Question> allQuestion = listPage.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(questionMapper.questionInfoToQuestionHomeDto(allQuestion), listPage), HttpStatus.OK);
    }

//  https://stackoverflow.com/search?q=user%3A1234
//    @PostMapping("/search")
//    public ResponseEntity search(@RequestParam String q) {
//        int totalQuestions = questionService.finaAllQuestions().size();
//        Page<Question> listPage = questionService.findAllQuestionsByPage(0, 15);
//        List<Question> allQuestion = listPage.getContent();
//        return new ResponseEntity<>(new HomeResponseDto<>(totalQuestions, questionMapper.questionInfoToQuestionHomeDto(allQuestion), listPage), HttpStatus.OK);
//
//    }

        }

