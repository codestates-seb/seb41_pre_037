package com.example.stackoverflowclone.question.mapper;

import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.question.dto.QuestionFindResponseDto;
import com.example.stackoverflowclone.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.question.dto.QuestionPostResponseDto;
import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.question_tag.entity.QuestionTag;
import com.example.stackoverflowclone.tag.entity.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Component
@RequiredArgsConstructor
public class QuestionMapper {

    public Question postQuestionDtoToQuestion(QuestionPostDto questionPostDto, List<Tag> tagList, Member member){

        if(questionPostDto == null){
            return null;
        }

        Question question = new Question();
        question.setQuestionTitle(questionPostDto.getQuestionTitle());
        question.setQuestionProblemBody(questionPostDto.getQuestionProblemBody());
        question.setQuestionTryOrExpectingBody(questionPostDto.getQuestionTryOrExpectingBody());
        question.setQuestionTagList(postQuestionDtoToQuestionTag(question,tagList));
        question.setMember(member);
        return question;

    }

    public List<QuestionTag> postQuestionDtoToQuestionTag(Question question, List<Tag> tagList){
        return tagList.stream()
                .map(tag -> {
                    return QuestionTag.builder()
                            .tag(tag)
                            .question(question)
                            .build();
                })
                .collect(Collectors.toList());
    }

    public QuestionPostResponseDto questionTagListToQuestionPostResponseDto(Question question, List<Tag> tagList){

        if(question == null || tagList == null){
            return null;
        }

        return QuestionPostResponseDto.builder()
                .questionId(question.getQuestionId())
                .questionTitle(question.getQuestionTitle())
                .questionProblemBody(question.getQuestionProblemBody())
                .questionTryOrExpectingBody(question.getQuestionTryOrExpectingBody())
                .tag(tagList)
                .build();
    }

    public QuestionFindResponseDto questionInfoToQuestionFindResponseDto(Question question, Member member, List<Tag> tagList, List<Answer> answers){

        if(question == null){
            return null;
        }

        return QuestionFindResponseDto.builder()
                .questionId(question.getQuestionId())
                .memberId(member.getMemberId())
                .username(member.getUsername())
                .image(member.getImage())
                .questionTitle(question.getQuestionTitle())
                .questionCreatedAt("1days")
                .questionModifiedAt("1days")
                .questionVoteCount(question.getQuestionVoteCount())
                .questionViewCount(question.getQuestionViewCount())
                .questionProblemBody(question.getQuestionProblemBody())
                .questionTryOrExpectingBody(question.getQuestionTryOrExpectingBody())
                .tag(tagList)
                .answers(answers)
                .build();
    }

}
