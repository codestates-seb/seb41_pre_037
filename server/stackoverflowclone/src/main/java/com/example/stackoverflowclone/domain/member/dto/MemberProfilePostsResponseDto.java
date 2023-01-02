package com.example.stackoverflowclone.domain.member.dto;

import com.example.stackoverflowclone.domain.answer.dto.AnswerByMemberDto;
import com.example.stackoverflowclone.domain.question.dto.QuestionByMemberDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MemberProfilePostsResponseDto {
    private List<QuestionByMemberDto> questions;
    private List<AnswerByMemberDto> answers;
}
