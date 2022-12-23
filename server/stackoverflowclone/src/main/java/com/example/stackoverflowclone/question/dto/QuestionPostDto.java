package com.example.stackoverflowclone.question.dto;

import com.example.stackoverflowclone.tag.entity.Tag;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class QuestionPostDto {
    private String email; // 리펙토리 포인트 (시큐리티 연결시)
    private String questionTitle;
    private String questionProblemBody;
    private String questionTryOrExpectingBody;
    private List<Tag> tag;
}
