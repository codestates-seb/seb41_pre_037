package com.example.stackoverflowclone.domain.question.controller;


import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.answer.service.AnswerService;
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
    private final AnswerService answerService;
    @GetMapping("/test")
    private ResponseEntity getTest() {
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping("/ask/post")
    public ResponseEntity<DataResponseDto> createQuestion(@LoginMemberId Long memberId,
                                                          @RequestBody @Valid QuestionPostDto questionPostDto) {

        log.info("getQuestionTitle = {}", questionPostDto.getQuestionTitle());
        log.info("getQuestionProblemBody = {}", questionPostDto.getQuestionProblemBody());
        log.info("getQuestionTryOrExpectingBody = {}", questionPostDto.getQuestionTryOrExpectingBody());
        log.info("getTag = ");
        // questionPostDto.getTag().stream().forEach(i -> System.out.println(i));

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
        String astr = answerService.timestamp(answers.get(0)); //TODO: answer를 찾아와야함, 0값을 넣어 둬서 (질문 + 답변)을 작성해야함
//        String astr = answerService.timestamp(answers.);
        List<QuestionFindAnswerDto> questionFindAnswerDto = questionMapper.answersToQuestionFindAnswerDto(answers,astr);
        Member member = question.getMember();
        String str = questionService.timestamp(question);
        String modified = questionService.timestampmodified(question);
        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionInfoToQuestionFindResponseDto(question, member, tagList, questionFindAnswerDto,str,modified)), HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity<DataResponseDto> deleteQuestion(@LoginMemberId Long memberId,
                                                          @PathVariable("question-id") Long questionId){

        questionService.deleteQuestion(questionId, memberId);

        return new ResponseEntity<>(new DataResponseDto("question delete complete !!"),HttpStatus.NO_CONTENT);
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
    public ResponseEntity getHome(@RequestParam(defaultValue = "Latest", required = false) String tab,
                                  @Positive @RequestParam(defaultValue = "1", required = false) int page) {
        if (tab.equals("Latest")) {
            Page<Question> listPage = questionService.findAllQuestionsByPage(page - 1, 15);
            List<Question> allQuestion = listPage.getContent();
            return new ResponseEntity<>(new MultiResponseDto<>(questionMapper.questionInfoToQuestionHomeDto(allQuestion), listPage), HttpStatus.OK);
        } else if (tab.equals("Unanswered")) {
            Page<Question> allQuestionsSortedByUnanswered = questionService.findAllQuestionsSortedByUnanswered(page - 1, 15);
            List<Question> content = allQuestionsSortedByUnanswered.getContent();
            return new ResponseEntity<>(new MultiResponseDto<>(questionMapper.questionInfoToQuestionHomeDto(content), allQuestionsSortedByUnanswered), HttpStatus.OK);
        } else {
            return null;
        }
    }

    @GetMapping("/search")
    public ResponseEntity search(@RequestParam String q,
                                 @RequestParam(defaultValue = "Latest", required = false) String tab,
                                 @Positive @RequestParam(defaultValue = "1", required = false) int page) {
        if (tab.equals("Latest")) {
            Page<Question> allQuestionsRelatedToUserSearch = questionService.findAllQuestionsRelatedToUserSearch(q, page - 1, 15);
            List<Question> content = allQuestionsRelatedToUserSearch.getContent();
            return new ResponseEntity<>(new MultiResponseDto<>(questionMapper.questionInfoToQuestionHomeDto(content), allQuestionsRelatedToUserSearch), HttpStatus.OK);
        } else {
            return null; //TODO : Unanswered 반영예정
        }
    }

    @PostMapping("/tagged/")
    public ResponseEntity searchByTag(@RequestParam String tagName,
                                      @Positive @RequestParam(defaultValue = "1", required = false) int page) {
        Page<Question> allQuestionsSortedByTagged = questionService.findAllQuestionsSortedByTagged(tagName, page - 1, 15);
        List<Question> content = allQuestionsSortedByTagged.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(questionMapper.questionInfoToQuestionHomeDto(content), allQuestionsSortedByTagged), HttpStatus.OK);
    }
}
