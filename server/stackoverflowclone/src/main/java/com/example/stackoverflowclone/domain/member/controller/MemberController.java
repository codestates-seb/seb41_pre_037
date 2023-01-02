package com.example.stackoverflowclone.domain.member.controller;

import com.example.stackoverflowclone.domain.member.dto.MemberEditDto;
import com.example.stackoverflowclone.domain.member.dto.MemberPostDto;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.member.mapper.MemberMapper;
import com.example.stackoverflowclone.domain.member.service.MemberService;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.global.response.DataResponseDto;
import com.example.stackoverflowclone.global.response.MultiResponseDto;
import com.example.stackoverflowclone.global.security.auth.loginresolver.LoginMemberId;
import com.example.stackoverflowclone.global.time.MemberTimeStamp;
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
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/users")
public class MemberController {
    private final MemberService memberService;

    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto) {
        Member member = mapper.memberPostToMember(memberPostDto);
        Member createMember = memberService.createMember(member);
        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberToMemberResponse(createMember)), HttpStatus.CREATED);
    }

    @GetMapping("/token")
    public ResponseEntity giveMemberInfo(@LoginMemberId Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberToMemberLoginResponseDto(member)), HttpStatus.OK);
    }

    @GetMapping("/{member-id}/{email}")
    public ResponseEntity getMemberProfile(@LoginMemberId Long loginMemberId,
                                           @PathVariable("member-id") Long memberId,
                                           @PathVariable(value = "email", required = true) String email) {
        memberService.verifyLoginMember(loginMemberId,memberId);
        Member member = memberService.findMember(memberId, email);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberToMemberProfileResponse(member)),
                HttpStatus.OK);
    }

    @GetMapping("/edit/{member-id}")
    public ResponseEntity getMemberEdit(@Positive @PathVariable("member-id") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberToMemberProfileResponse(member)),
                HttpStatus.OK);
    }

    @GetMapping("/delete/{member-id}")
    public ResponseEntity getDeleteMember(@Positive @PathVariable("member-id") Long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberToMemberProfileResponse(member)),
                HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity findUsers(@Positive @RequestParam(defaultValue = "1", required = false) int page,
                                    @RequestParam(defaultValue = "", required = false) String search) {
        Page<Member> pageUsers = memberService.findMembers(search, page - 1, 16);
        List<Member> users = pageUsers.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.memberUserToResponseDto(users), pageUsers), HttpStatus.OK);
    }

    @PatchMapping("/edit/{member-id}/patch")
    public ResponseEntity patchMember(@PathVariable("member-id") @Valid Long memberId, @RequestBody MemberEditDto memberEditDto) {
        memberEditDto.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchToMember(memberEditDto));
        return new ResponseEntity<>(new DataResponseDto<>(
                mapper.memberToMemberProfileResponse(member)), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{member-id}/confirm")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Valid Long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
