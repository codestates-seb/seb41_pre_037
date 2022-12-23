package com.example.stackoverflowclone.member.mapper;

import com.example.stackoverflowclone.member.dto.MemberPostDto;
import com.example.stackoverflowclone.member.dto.MemberPostResponseDto;
import com.example.stackoverflowclone.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class MemberMapper {
    public Member memberPostToMember(MemberPostDto memberPostDto){
        if (memberPostDto == null){
            return null;
        }
      return Member.builder()
              .username(memberPostDto.getUsername())
              .email(memberPostDto.getEmail())
              .password(memberPostDto.getPassword())
              .location("")
              .title("")
              .aboutMe("")
              .image("")
              .twitterLink("")
              .githubLink("")
              .fullname("")
              .build();
    }
//    Member memberPatchToMember(MemberPatchDto requestBody);
    public MemberPostResponseDto memberToMemberResponse(Member member){
        if (member == null){
            return null;
        }

        return MemberPostResponseDto.builder()
                .memberId(member.getMemberId())
                .username(member.getUsername())
                .email(member.getEmail())
                .build();
    }

//    List<MemberResponseDto> membersToMemberResponses(List<Member> members);
}
