package com.example.stackoverflowclone.member.mapper;

import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.audit.Auditable;
import com.example.stackoverflowclone.member.dto.MemberPostDto;
import com.example.stackoverflowclone.member.dto.MemberPostResponseDto;
import com.example.stackoverflowclone.member.dto.MemberProfilePatchDto;
import com.example.stackoverflowclone.member.dto.MemberProfileResponseDto;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.vote.entity.AnswerVote;
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
              .websiteLink("")
              .twitterLink("")
              .githubLink("")
              .fullname("")
              .build();
    }
//    public Member memberPatchToMember(MemberProfilePatchDto memberProfilePatchDto){
//
//        return Member.builder()
//                .memberId(memberProfilePatchDto.getMemberId())
//                .profileCreatedAt(memberProfilePatchDto.getCreatedAt()) //
//                .username(memberProfilePatchDto.getUsername())
//                .email(memberProfilePatchDto.getEmail())
//                .location(memberProfilePatchDto.getLocation())
//                .title(memberProfilePatchDto.getTitle())
//                .aboutMe(memberProfilePatchDto.getAboutMe())
//                .image(memberProfilePatchDto.getImage())
//                .websiteLink(memberProfilePatchDto.getWebsiteLink())
//                .twitterLink(memberProfilePatchDto.getTwitterLink())
//                .githubLink(memberProfilePatchDto.getGithubLink())
//                .fullname(memberProfilePatchDto.getFullname())
////                .answers(member.getAnswerVoteList()) //
////                .question(member.getMemberId().getQuestionVoteCount()) //
//                .build();
//    }
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
    public MemberProfileResponseDto memberTomemberProfileResponse(Member member){
        return MemberProfileResponseDto.builder()
                .memberId(member.getMemberId())
                .profileCreatedAt(member.getCreatedAt()) //
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
                .build();
    }

//    List<MemberResponseDto> membersToMemberResponses(List<Member> members);
}
