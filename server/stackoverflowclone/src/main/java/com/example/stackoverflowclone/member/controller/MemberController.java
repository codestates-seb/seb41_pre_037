package com.example.stackoverflowclone.member.controller;

import com.example.stackoverflowclone.member.dto.MemberPostDto;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.member.mapper.MemberMapper;
import com.example.stackoverflowclone.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.example.stackoverflowclone.response.dataResponseDto;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/users")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;



    @PostMapping
    public ResponseEntity postMember(@RequestBody MemberPostDto memberPostDto){
        Member member = mapper.memberPostToMember(memberPostDto);
        Member createMember = memberService.createMember(member);
        return new ResponseEntity<>(
                new dataResponseDto<>(mapper.memberToMemberResponse(createMember)), HttpStatus.CREATED);
    }

//    @PatchMapping("/")
//    public ResponseEntity postMember(@PathVariable("/") @Positive long memberId, @RequestBody MemberPostDto memberPostDto){
//
//        return new ResponseEntity<>(
//            new dataResponseDto<>(), HttpStatus.OK);
//    }

//
//    @GetMapping("member-id")
//    public ResponseEntity getMember(){
//        return  null;
//    }
//
//    @GetMapping("member-id")
//    public ResponseEntity getMembers(){
//        return  null;
//    }
//
//    @DeleteMapping("member-id")
//    public ResponseEntity deleteMember(){
//        return null;
//    }
//    @DeleteMapping("member-id")
//    public ResponseEntity deleteMembers(){
//        return null;
//    }
}
