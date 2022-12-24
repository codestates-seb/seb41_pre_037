package com.example.stackoverflowclone.domain.question.mapper;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.dto.QuestionFindAnswerDto;
import com.example.stackoverflowclone.domain.question.dto.QuestionFindResponseDto;
import com.example.stackoverflowclone.domain.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.dto.QuestionPostResponseDto;
import com.example.stackoverflowclone.domain.question_tag.entity.QuestionTag;
import com.example.stackoverflowclone.domain.tag.entity.Tag;
import com.example.stackoverflowclone.domain.vote.entity.QuestionVote;
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

        if(questionPostDto == null || tagList == null || member == null) {
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

    public QuestionFindResponseDto questionInfoToQuestionFindResponseDto(Question question, Member member, List<Tag> tagList, List<QuestionFindAnswerDto> answers){

        if(question == null || member == null || tagList == null || answers == null){
            return null;
        }

        return QuestionFindResponseDto.builder()
                .questionId(question.getQuestionId())
                .memberId(member.getMemberId())
                .username(member.getUsername())
                .image(member.getImage())
                .questionTitle(question.getQuestionTitle())
                .questionCreatedAt("1days") // TODO: 리펙토링 포인트 -> 날짜 계산하는 로직구현하여 계산된 값으로 변경필요
                .questionModifiedAt("1days") // TODO: 리펙토링 포인트 -> 날짜 계산하는 로직구현하여 계산된 값으로 변경필요
                .questionVoteCount(question.getQuestionVoteCount())
                .questionViewCount(question.getQuestionViewCount())
                .questionProblemBody(question.getQuestionProblemBody())
                .questionTryOrExpectingBody(question.getQuestionTryOrExpectingBody())
                .tag(tagList)
                .answers(answers)
                .build();
    }

    public List<QuestionFindAnswerDto> answersToQuestionFindAnswerDto(List<Answer> answers){

        if(answers == null){
            return null;
        }

        return answers.stream()
                .map(answer -> {
                    return QuestionFindAnswerDto.builder()
                            .answerId(answer.getAnswerId())
                            .answerCreatedAt("1 min ago")
                            .answerContent(answer.getAnswerContent())
                            .answerVoteCount(answer.getAnswerVoteCount())
                            .memberId(answer.getMember().getMemberId())
                            .username(answer.getMember().getUsername())
                            .image(answer.getMember().getImage())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public QuestionVote questionMemberInfoToQuestionVote(Member member,Question question){

        return QuestionVote.builder()
                .status(true)
                .member(member)
                .question(question)
                .build();
    }
}
