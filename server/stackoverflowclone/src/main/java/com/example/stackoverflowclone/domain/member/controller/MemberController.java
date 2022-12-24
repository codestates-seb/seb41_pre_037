package com.example.stackoverflowclone.domain.member.controller;

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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/users")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity postMember(@RequestBody MemberPostDto memberPostDto) {
        Member member = mapper.memberPostToMember(memberPostDto);
        Member createMember = memberService.createMember(member);
        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberToMemberResponse(createMember)), HttpStatus.CREATED);
    }

//    @PatchMapping("/edit/{member-id}")
//    public ResponseEntity patchMember(
//            @PathVariable("{member-id}") long memberId,
//                @RequestBody MemberPostDto memberPostDto){
//
//        return new ResponseEntity<>(
//            new DataResponseDto<>(mapper.memberToMember().OK);
//    }


    @GetMapping("/{member-id}/{username}")
    public ResponseEntity getMember(@PathVariable("member-id")
                                    long memberId){
        Member member = memberService.findByMember(memberId);

        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberTomemberProfileResponse(member)),
                        HttpStatus.OK );
    }

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

    @GetMapping("/main")
    public ResponseEntity findUsers() {
        Page<Member> pageUsers = memberService.findMembers(0, 15);
        List<Member> users = pageUsers.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberUserToResponseDto(users), pageUsers),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity findUsers(@Positive @RequestParam int page) {
        Page<Member> pageUsers = memberService.findMembers(page - 1, 15);
        List<Member> users = pageUsers.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberUserToResponseDto(users), pageUsers),
                HttpStatus.OK);
    }

}
