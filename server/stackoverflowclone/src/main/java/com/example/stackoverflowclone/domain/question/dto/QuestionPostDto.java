package com.example.stackoverflowclone.domain.question.dto;

import com.example.stackoverflowclone.domain.tag.entity.Tag;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@Builder
public class QuestionPostDto {
    @NotBlank(message = "Null값과 공백을 허용할 수 없습니다.")
    private String questionTitle;
    private String questionProblemBody;
    private String questionTryOrExpectingBody;
    private List<QuestionPostTagDto> tag;
}
