package com.example.stackoverflowclone.domain.member.mapper;

import com.example.stackoverflowclone.domain.answer.dto.AnswerByMemberDto;
import com.example.stackoverflowclone.domain.member.dto.*;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.dto.QuestionByMemberDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
@RequiredArgsConstructor
public class MemberMapper {
    public Member memberPostToMember(MemberPostDto memberPostDto) {
        if (memberPostDto == null) {
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

    public Member memberPatchToMember(MemberEditDto memberEditDto) {

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

    public MemberPostResponseDto memberToMemberResponse(Member member) {
        if (member == null) {
            return null;
        }

        return MemberPostResponseDto.builder()
                .memberId(member.getMemberId())
                .username(member.getUsername())
                .email(member.getEmail())
                .build();
    }

    public MemberProfileResponseDto memberToMemberProfileResponse(Member member) {
        return MemberProfileResponseDto.builder()
                .memberId(member.getMemberId())
                .profileCreatedAt(member.getCreatedAt())
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
                .totalMyQuestions(member.getQuestionList().size())
                .totalMyAnswers(member.getAnswersList().size())
                .profilePosts(memberToProfilePostsResponseDtoList(member))
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

    public MemberLoginResponseDto memberToMemberLoginResponseDto(Member member) {
        return MemberLoginResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .image(member.getImage())
                .build();
    }

    public List<MemberProfilePostsResponseDto> memberToProfilePostsResponseDtoList(Member member){

        MemberProfilePostsResponseDto memberProfilePostsResponseDto = MemberProfilePostsResponseDto.builder()
                .questions(memberToQuestionByMemberDtoList(member))
                .answers(memberToAnswerByMemberDtoList(member))
                .build();
        List<MemberProfilePostsResponseDto> memberProfilePostsResponseDtoList = new ArrayList<>(List.of(memberProfilePostsResponseDto));
        return memberProfilePostsResponseDtoList;
    }

    public List<QuestionByMemberDto> memberToQuestionByMemberDtoList(Member member){
        return member.getQuestionList().stream()
                .map(
                        question -> {
                            return QuestionByMemberDto.builder()
                                    .questionId(question.getQuestionId())
                                    .questionTitle(question.getQuestionTitle())
                                    .questionCreatedAt(question.getCreatedAt())
                                    .questionVoteCount(question.getQuestionVoteCount())
                                    .build();
                        })
                .collect(Collectors.toList());
    }

    public List<AnswerByMemberDto> memberToAnswerByMemberDtoList(Member member){
        return member.getAnswersList().stream()
                .map(
                        answer -> {
                            return AnswerByMemberDto.builder()
                                    .answerId(answer.getAnswerId())
                                    .answerTitle(answer.getQuestion().getQuestionTitle())
                                    .answerCreatedAt(answer.getCreatedAt())
                                    .answerVoteCount(answer.getAnswerVoteCount())
                                    .build();
                        })
                .collect(Collectors.toList());
    }

}
