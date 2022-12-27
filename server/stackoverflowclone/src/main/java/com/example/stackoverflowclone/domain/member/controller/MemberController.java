package com.example.stackoverflowclone.domain.member.controller;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.answer.service.AnswerService;
import com.example.stackoverflowclone.domain.member.dto.MemberEditDto;
import com.example.stackoverflowclone.domain.member.dto.MemberPostDto;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.member.mapper.MemberMapper;
import com.example.stackoverflowclone.domain.member.service.MemberService;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.service.QuestionService;
import com.example.stackoverflowclone.global.response.DataResponseDto;
import com.example.stackoverflowclone.global.response.MultiResponseDto;
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

@RestController
@RequestMapping("/users")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerService answerService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){
        Member member = mapper.memberPostToMember(memberPostDto);
        Member createMember = memberService.createMember(member);
        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberToMemberResponse(createMember)), HttpStatus.CREATED);
    }
    @GetMapping("/{member-id}/{username}") // TODO: username 수정필요
    public ResponseEntity getMemberProfile(@PathVariable("member-id") @Valid Long memberId){
        System.out.println("들어옴");
        Member member = memberService.findByMember(memberId);
        // TODO: 내가 한 Question, Answer 조회 기능
//        List<Question> questions = questionService.findMemberQuestion(member);
//        log.info("questions = {}", questions);
//        log.info("questions.size() = {}", questions.size()); //누가 한지는 모른다.
//
//        List<Answer> answers = answerService.findMemberAnswer(member);
//        log.info("answer = {}", answers);
//        log.info("answer.size() = {}", answers.size());

        // 멤버 객체를 이용한 답변 내가 작성한 객체를 가져와야함
        // 회원아이디찾아서 size()? list<>
        // answer repo에서 아이디 찾음
        // answer 서비스에서 반환
        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberTomemberProfileResponse(member)),
                HttpStatus.OK );
    }
    @GetMapping("/edit/{member-id}")
    public ResponseEntity getMemberEdit(@PathVariable("member-id")
                                        @Valid Long memberId){
        Member member = memberService.findByMember(memberId);
        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberTomemberProfileResponse(member)),
                HttpStatus.OK );
    }

    @GetMapping("/delete/{member-id}")
    public ResponseEntity getdeleteMember(@PathVariable("member-id") @Valid Long memberId){
        Member member = memberService.findByMember(memberId);
        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberTomemberProfileResponse(member)),
                HttpStatus.OK );
    }

    @DeleteMapping("/delete/{member-id}/confirm")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Valid Long memberId){
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/edit/{member-id}/patch")
    public ResponseEntity patchMember(@PathVariable("member-id") @Valid Long memberId, @RequestBody MemberEditDto memberEditDto){
        memberEditDto.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchToMember(memberEditDto));
        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberTomemberProfileResponse(member))
                ,HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity findUsers(@Positive @RequestParam(defaultValue = "1" ,required = false) int page) {
        Page<Member> pageUsers = memberService.findMembers(page - 1, 15);
        List<Member> users = pageUsers.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberUserToResponseDto(users), pageUsers),
                HttpStatus.OK);
    }

}
