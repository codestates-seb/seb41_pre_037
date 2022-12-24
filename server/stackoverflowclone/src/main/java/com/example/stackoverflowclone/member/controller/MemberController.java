package com.example.stackoverflowclone.member.controller;

import com.example.stackoverflowclone.member.dto.MemberPostDto;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.member.mapper.MemberMapper;
import com.example.stackoverflowclone.member.service.MemberService;
import com.example.stackoverflowclone.response.DataResponseDto;
import com.example.stackoverflowclone.response.MultiResponseDto;
import com.example.stackoverflowclone.response.PageInfo;
import lombok.Getter;
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


    @GetMapping
    public ResponseEntity findUsers(@Positive @RequestParam int page) {
        Page<Member> pageUsers = memberService.findMembers(page - 1, 30);
        List<Member> users = pageUsers.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberUserToResponseDto(users), pageUsers),
                HttpStatus.OK);
    }

}
