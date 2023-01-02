package com.example.stackoverflowclone.domain.question.controller;


import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.member.service.MemberService;
import com.example.stackoverflowclone.domain.question.dto.QuestionFindAnswerDto;
import com.example.stackoverflowclone.domain.question.dto.QuestionHomeDto;
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
import com.example.stackoverflowclone.global.time.AnswerTimeStamp;
import com.example.stackoverflowclone.global.time.QuestionTimeStamp;
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
        List<Tag> tagList = tagService.findTags(questionPostDto);
        Member member = memberService.findMember(memberId);
        Question question = questionService.postQuestion(questionMapper.postQuestionDtoToQuestion(questionPostDto, tagList, member));

        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionTagListToQuestionPostResponseDto(question, tagList)), HttpStatus.CREATED);
    }

    @PostMapping("/{question-id}/vote/2")
    public ResponseEntity<DataResponseDto> questionUpVote(@LoginMemberId Long memberId,
                                                          @Positive @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionVoteService.increaseVote(member, question);

        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionToQuestionVoteResponseDto(question)), HttpStatus.OK);
    }

    @PostMapping("/{question-id}/vote/3")
    public ResponseEntity<DataResponseDto> questionDownVote(@LoginMemberId Long memberId,
                                                            @Positive @PathVariable("question-id") Long questionId) {
        Member member = memberService.findMember(memberId);
        Question question = questionService.findQuestion(questionId);
        questionVoteService.decreaseVote(member, question);

        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionToQuestionVoteResponseDto(question)), HttpStatus.OK);
    }

    @GetMapping("/test")
    private ResponseEntity getTest() {
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}/{question-title}")
    public ResponseEntity<DataResponseDto> findQuestion(@Positive @PathVariable("question-id") Long questionId,
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

    @GetMapping()
    public ResponseEntity getHome(@RequestParam(defaultValue = "Latest", required = false) String tab,
                                  @Positive @RequestParam(defaultValue = "1", required = false) int page) {
        if (tab.equals("Latest")) {
            Page<Question> listPage = questionService.findAllQuestions(page - 1, 15);
            List<Question> allQuestion = listPage.getContent();
            return getMultiResponseDtoFromResponseEntity(listPage, allQuestion);
        } else if (tab.equals("Unanswered")) {
            Page<Question> allQuestionsSortedByUnanswered = questionService.findAllUnansweredQuestions(page - 1, 15);
            List<Question> content = allQuestionsSortedByUnanswered.getContent();
            return getMultiResponseDtoFromResponseEntity(allQuestionsSortedByUnanswered, content);
        } else {
            return null;
        }
    }

    @GetMapping("/search")
    public ResponseEntity search(@RequestParam(defaultValue = "", required = false) String q,
                                 @Positive @RequestParam(defaultValue = "1", required = false) int page) {
        Page<Question> allQuestionsRelatedToUserSearch = questionService.findAllQuestions(q, page - 1, 15);
        List<Question> content = allQuestionsRelatedToUserSearch.getContent();
        if (q.contains(":")) {
            int index = q.indexOf(":");
            String expect = q.substring(0, index + 1);
            if (!(q.equalsIgnoreCase("user:")) && expect.equalsIgnoreCase("user:")) {
                Long id = Long.parseLong(q.substring(index + 1));
                Page<Question> allQuestionsSortedByUserId = questionService.findAllQuestions(id, page - 1, 15);
                List<Question> questions = allQuestionsSortedByUserId.getContent();
                return getMultiResponseDtoFromResponseEntity(allQuestionsSortedByUserId, questions);
            } else if (!(q.equalsIgnoreCase("answers:")) && expect.equalsIgnoreCase("answers:")) {
                Page<Question> allQuestionsSortedByAnswerCount = questionService.findAllUnansweredQuestions(page - 1, 15);
                List<Question> questions = allQuestionsSortedByAnswerCount.getContent();
                return getMultiResponseDtoFromResponseEntity(allQuestionsSortedByAnswerCount, questions);
            } else {
                return getMultiResponseDtoFromResponseEntity(allQuestionsRelatedToUserSearch, content);
            }
        } else {
            return getMultiResponseDtoFromResponseEntity(allQuestionsRelatedToUserSearch, content);
        }
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity<DataResponseDto> deleteQuestion(@LoginMemberId Long memberId,
                                                          @Positive @PathVariable("question-id") Long questionId) {
        questionService.deleteQuestion(questionId, memberId);
        return new ResponseEntity<>(new DataResponseDto("question delete complete !!"), HttpStatus.NO_CONTENT);
    }

    private ResponseEntity<MultiResponseDto<QuestionHomeDto>> getMultiResponseDtoFromResponseEntity(Page<Question> allQuestionsByPageNation, List<Question> questions) {
        return new ResponseEntity<>(new MultiResponseDto<>(
                questionMapper.questionInfoToQuestionHomeDto(questions),
                allQuestionsByPageNation),
                HttpStatus.OK);
    }
}
