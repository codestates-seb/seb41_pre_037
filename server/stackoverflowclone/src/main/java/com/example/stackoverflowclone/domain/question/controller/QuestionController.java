package com.example.stackoverflowclone.domain.question.controller;


import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.answer.service.AnswerService;
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
import com.example.stackoverflowclone.global.security.auth.loginresolver.LoginMemberEmail;
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
        List<Tag> tagList = tagService.findTags(questionPostDto);
        Member member = memberService.findByMember(memberId);
        Question question = questionService.postQuestion(questionMapper.postQuestionDtoToQuestion(questionPostDto, tagList, member));

        return new ResponseEntity<>(new DataResponseDto(questionMapper.questionTagListToQuestionPostResponseDto(question, tagList)), HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}/{question-title}")
    public ResponseEntity<DataResponseDto> findQuestion(@PathVariable("question-id") Long questionId,
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
            return getMultiResponseDtoFromResponseEntity(listPage, allQuestion);
        } else if (tab.equals("Unanswered")) {
            Page<Question> allQuestionsSortedByUnanswered = questionService.findAllQuestionsSortedByUnanswered(page - 1, 15);
            List<Question> content = allQuestionsSortedByUnanswered.getContent();
            return getMultiResponseDtoFromResponseEntity(allQuestionsSortedByUnanswered, content);
        } else {
            return null;
        }
    }

    @GetMapping("/search")
    public ResponseEntity search(@RequestParam(defaultValue = "", required = false) String q,
                                 @Positive @RequestParam(defaultValue = "1", required = false) int page) {
        Page<Question> allQuestionsRelatedToUserSearch = questionService.findAllQuestionsRelatedToUserSearch(q, page - 1, 15);
        List<Question> content = allQuestionsRelatedToUserSearch.getContent();
//        log.info("q?? {}", q);
        if (q.contains(":")) {
            int index = q.indexOf(":");
            String expect = q.substring(0, index + 1);
//            log.info("expect?? {}", expect);
            if (!(q.equalsIgnoreCase("user:")) && expect.equalsIgnoreCase("user:")) {
                Long id = Long.parseLong(q.substring(index + 1));
                Page<Question> allQuestionsSortedByUserId = questionService.findAllQuestionsSortedByUserId(id, page - 1, 15);
                List<Question> questions = allQuestionsSortedByUserId.getContent();
                return getMultiResponseDtoFromResponseEntity(allQuestionsSortedByUserId, questions);
            } else if (!(q.equalsIgnoreCase("answers:")) && expect.equalsIgnoreCase("answers:")) {
                Page<Question> allQuestionsSortedByAnswerCount = questionService.findAllQuestionsSortedByUnanswered(page - 1, 15);
                List<Question> questions = allQuestionsSortedByAnswerCount.getContent();
                return getMultiResponseDtoFromResponseEntity(allQuestionsSortedByAnswerCount, questions);
            } else
            return getMultiResponseDtoFromResponseEntity(allQuestionsRelatedToUserSearch, content);
        } else {
            return getMultiResponseDtoFromResponseEntity(allQuestionsRelatedToUserSearch, content);
        }
    }

//    @GetMapping("/tagged/{tag-name}")
//    public ResponseEntity searchByTag(@Positive @RequestParam(defaultValue = "1", required = false) int page,
//                                      @PathVariable("tag-name") String tagName) {
//        log.info("tag-name : {}", tagName);
//        Page<Question> allQuestionsSortedByTagged = questionService.findAllQuestionsSortedByTagged(tagName, page - 1, 15);
//        List<Question> content = allQuestionsSortedByTagged.getContent();
//        return getMultiResponseDtoFromResponseEntity(allQuestionsSortedByTagged, content);
//    }


    private ResponseEntity<MultiResponseDto<QuestionHomeDto>> getMultiResponseDtoFromResponseEntity(Page<Question> allQuestionsByPageNation, List<Question> questions) {
        return new ResponseEntity<>(new MultiResponseDto<>(
                questionMapper.questionInfoToQuestionHomeDto(questions),
                allQuestionsByPageNation),
                HttpStatus.OK);
    }

}
