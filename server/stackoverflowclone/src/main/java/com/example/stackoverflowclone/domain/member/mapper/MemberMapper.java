package com.example.stackoverflowclone.domain.member.mapper;
import com.example.stackoverflowclone.domain.member.dto.*;
import com.example.stackoverflowclone.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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
              .websiteLink("")
              .twitterLink("")
              .githubLink("")
              .fullname("")
              .build();
    }
    public Member memberPatchToMember(MemberEditDto memberEditDto){

        return Member.builder()
                .memberId(memberEditDto.getMemberId())
                .username(memberEditDto.getUsername())
                .location(memberEditDto.getLocation())
                .title(memberEditDto.getTitle())
                .aboutMe(memberEditDto.getAboutMe())
                .image(memberEditDto.getImage())
                .websiteLink(memberEditDto.getWebsiteLink())
                .twitterLink(memberEditDto.getTwitterLink())
                .githubLink(memberEditDto.getGithubLink())
                .fullname(memberEditDto.getFullname())
                .build();
    }
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
    public MemberProfileResponseDto memberTomemberProfileResponse( Member member,String str){
        return MemberProfileResponseDto.builder()
                .memberId(member.getMemberId())
                .profileCreatedAt(str) //
                .username(member.getUsername())
                .email(member.getEmail())
                .location(member.getLocation())
                .title(member.getTitle())
                .aboutMe(member.getAboutMe())
                .image(member.getImage())
                .websiteLink(member.getWebsiteLink())
                .twitterLink(member.getTwitterLink())
                .githubLink(member.getGithubLink())
                .fullname(member.getFullname())
                .questions((long)member.getQuestionList().size())
                .answers((long)member.getAnswersList().size())
                .build();
    }
    public List<MemberToUserPageResponseDto> memberUserToResponseDto(List<Member> members) {
        if (members == null) {
            return null;
        }

        return members.stream()
                .map(member -> {
                    return MemberToUserPageResponseDto.builder()
                            .memberId(member.getMemberId())
                            .username(member.getUsername())
                            .image(member.getImage())
                            .location(member.getLocation())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
