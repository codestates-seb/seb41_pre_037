package com.example.stackoverflowclone.member.mapper;

import com.example.stackoverflowclone.member.dto.MemberPostDto;
import com.example.stackoverflowclone.member.dto.MemberResponseDto;
import com.example.stackoverflowclone.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostToMember(MemberPostDto requestBody);
//    Member memberPatchToMember(MemberPatchDto requestBody);
    MemberResponseDto memberToMemberResponse(Member member);
//    List<MemberResponseDto> membersToMemberResponses(List<Member> members);
}
