package com.example.stackoverflowclone.domain.member.controller;

import com.example.stackoverflowclone.domain.member.dto.MemberEditDto;
import com.example.stackoverflowclone.domain.member.dto.MemberPostDto;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.member.mapper.MemberMapper;
import com.example.stackoverflowclone.domain.member.service.MemberService;
import com.example.stackoverflowclone.global.response.DataResponseDto;
import com.example.stackoverflowclone.global.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;


@Slf4j
@RestController
@Validated
//@CrossOrigin
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

    @GetMapping("/{member-id}/{username}") // TODO: username 수정필요
    public ResponseEntity getMemberProfile(@PathVariable("member-id") @Valid Long memberId) {

        Member member = memberService.findByMember(memberId);
        String str = memberService.timestamp(member);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberTomemberProfileResponse(member, str)),
                HttpStatus.OK);

    }

    @GetMapping("/edit/{member-id}")
    public ResponseEntity getMemberEdit(@PathVariable("member-id")
                                        @Valid Long memberId) {
        Member member = memberService.findByMember(memberId);
        String str = memberService.timestamp(member);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberTomemberProfileResponse(member, str)),
                HttpStatus.OK);
    }

    @GetMapping("/delete/{member-id}")
    public ResponseEntity getdeleteMember(@PathVariable("member-id") @Valid Long memberId) {
        Member member = memberService.findByMember(memberId);
        String str = memberService.timestamp(member);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberTomemberProfileResponse(member, str)),
                HttpStatus.OK);
    }

    @DeleteMapping("/delete/{member-id}/confirm")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Valid Long memberId) {
        memberService.deleteMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/edit/{member-id}/patch")
    public ResponseEntity patchMember(@PathVariable("member-id") @Valid Long memberId, @RequestBody MemberEditDto memberEditDto) {
        memberEditDto.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchToMember(memberEditDto));
        String str = memberService.timestamp(member);
        return new ResponseEntity<>(new DataResponseDto<>(mapper.memberTomemberProfileResponse(member, str))
                , HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity findUsers(@Positive @RequestParam(defaultValue = "1", required = false) int page) {
        Page<Member> pageUsers = memberService.findMembers(page - 1, 16);
        List<Member> users = pageUsers.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberUserToResponseDto(users), pageUsers),
                HttpStatus.OK);
    }

}
