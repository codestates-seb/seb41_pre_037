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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;
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
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){
        Member member = mapper.memberPostToMember(memberPostDto);
        Member createMember = memberService.createMember(member);
        return new ResponseEntity<>(
                new DataResponseDto<>(mapper.memberToMemberResponse(createMember)), HttpStatus.CREATED);
    }
    @GetMapping("/{member-id}/{username}") // TODO: username 수정필요
    public ResponseEntity getMemberProfile(@PathVariable("member-id") @Valid Long memberId){
        Member member = memberService.findByMember(memberId);
            LocalDateTime now = LocalDateTime.now(); // 현재시간
            LocalDateTime date = LocalDateTime.of(2022,12,25,0,0,0); // 생성시간
        // date -> member 생성일, question 생성일, answer 생성일 클래스 하나로
            System.out.println("현재시간 = "+now);
            System.out.println("생성시간 = "+date);
        long min = ChronoUnit.MINUTES.between(date, now);
        long hour = ChronoUnit.HOURS.between(date, now);
        long days = ChronoUnit.DAYS.between(date, now);
        long month = ChronoUnit.MONTHS.between(date, now);
        long years = ChronoUnit.YEARS.between(date, now);
        // 프로필
        System.out.println("================= 프로필 =================");
        System.out.println("member for "+ days +" Day"); //
        // member for 1개월 1일 x
        // member for 1month 1day
        System.out.println("Last seen this week");
        System.out.println("Visited "+ days +" days," + days +" consecutive"); // 연속 방문 일수  -> ???



        // if year 0이 아니면 year 쓰고
        // elif y
        // 질문 답변
        System.out.println("================= 질문, 답변 =================");
        System.out.println("질문, 답변 분 = "+ min%60 +" min ago"); // 이어 붙여야하는데
        System.out.println("질문, 답변 시간 = "+ hour%24 +" hour ago");
        System.out.println("질문, 답변 일 = "+ days%30 +" days ago");
        System.out.println("질문, 답변 월 = "+ month%12 +" month ago");
        System.out.println("질문, 답변 년도 = "+ years%100 +" years ago");

        //member -> 생성시간
//            // 프로필
//            System.out.println("member for "+ ChronoUnit.DAYS.between(member.getCreatedAt(), now) +" Day"); // 31일 이면 -> 1개월 1일 로 변환됨
//            // member for 1개월 1일 x
//            // member for 1month 1day
//            System.out.println("Last seen this week");
//            System.out.println("Visited "+ ChronoUnit.DAYS.between(member.getCreatedAt(), now) +" days," + ChronoUnit.DAYS.between(member.getCreatedAt(), now) +" consecutive");
//
//            // 질문 답변
//            System.out.println("질문, 답변  = "+ ChronoUnit.MINUTES.between(member.getCreatedAt(), now) +" min ago"); // minusMinutes();
//            System.out.println("질문, 답변  = "+ ChronoUnit.HOURS.between(member.getCreatedAt(), now) +" hour ago"); // 달이 한글로 나온다?
//            System.out.println("질문, 답변  = "+ ChronoUnit.DAYS.between(member.getCreatedAt(), now) +" days ago");
//            System.out.println("질문, 답변  = "+ ChronoUnit.MONTHS.between(member.getCreatedAt(), now) +" month ago");


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
        Page<Member> pageUsers = memberService.findMembers(page - 1, 16);
        List<Member> users = pageUsers.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.memberUserToResponseDto(users), pageUsers),
                HttpStatus.OK);
    }

//    @PostMapping
//
//    // TODO: 유저 찾기 기능 구현 예정 ex) user:1234
////        String[] s = new String[]{"user", "useR", "usEr", "usER", "uSer", "uSeR", "uSEr", "uSER",
////                "User", "UseR", "UsEr", "UsER", "USer", "USeR", "USEr", "USER"};
//
//        if (q.startsWith("user")) {
//        Page<Question> allQuestionsRelatedToUserSearch = questionService.findAllQuestionsRelatedToUserSearch(q, page - 1, 15);
//        //repo


}
