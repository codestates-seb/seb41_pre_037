package com.example.stackoverflowclone.question.mapper;

import com.example.stackoverflowclone.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.question.entity.Question;
import org.springframework.stereotype.Component;


@Component
public class QuestionMapper {

    public Question postQuestionDtoToQuestion(QuestionPostDto postQuestionDto){

        if(postQuestionDto == null){
            return null;
        }

        Question question = Question.builder()
                .questionTitle(postQuestionDto.getQuestionTitle())
                .questionProblemBody(postQuestionDto.getQuestionProblemBody())
                .questionTryOrExpectingBody(postQuestionDto.getQuestionTryOrExpectingBody())
                .build();

        return question;
    }


}
