package com.example.stackoverflowclone.domain.question.mapper;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.dto.*;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question_tag.entity.QuestionTag;
import com.example.stackoverflowclone.domain.tag.entity.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Component
@RequiredArgsConstructor
public class QuestionMapper {

    public Question postQuestionDtoToQuestion(QuestionPostDto questionPostDto, List<Tag> tagList, Member member) {

        if (questionPostDto == null || tagList == null || member == null) {
            return null;
        }

        Question question = new Question();
        question.setQuestionTitle(questionPostDto.getQuestionTitle());
        question.setQuestionProblemBody(questionPostDto.getQuestionProblemBody());
        question.setQuestionTryOrExpectingBody(questionPostDto.getQuestionTryOrExpectingBody());
        question.setQuestionTagList(postQuestionDtoToQuestionTag(question, tagList));
        question.setMember(member);
        return question;

    }

    public List<QuestionTag> postQuestionDtoToQuestionTag(Question question, List<Tag> tagList) {
        return tagList.stream()
                .map(tag -> {
                    return QuestionTag.builder()
                            .tag(tag)
                            .question(question)
                            .build();
                })
                .collect(Collectors.toList());
    }

    public QuestionPostResponseDto questionTagListToQuestionPostResponseDto(Question question, List<Tag> tagList) {

        if (question == null || tagList == null) {
            return null;
        }

        return QuestionPostResponseDto.builder()
                .questionId(question.getQuestionId())
                .questionTitle(question.getQuestionTitle())
                .questionProblemBody(question.getQuestionProblemBody())
                .questionTryOrExpectingBody(question.getQuestionTryOrExpectingBody())
                .tag(tagListToQuestionTagResponseDto(tagList))
                .build();
    }

    public QuestionFindResponseDto questionInfoToQuestionFindResponseDto(Question question, Member member, List<Tag> tagList, List<QuestionFindAnswerDto> answers) {

        if (question == null || member == null || tagList == null || answers == null) {
            return null;
        }

        return QuestionFindResponseDto.builder()
                .questionId(question.getQuestionId())
                .memberId(member.getMemberId())
                .username(member.getUsername())
                .image(member.getImage())
                .questionTitle(question.getQuestionTitle())
                .questionCreatedAt(question.getCreatedAt())
                .questionModifiedAt(question.getModifiedAt())
                .questionVoteCount(question.getQuestionVoteCount())
                .questionViewCount(question.getQuestionViewCount())
                .questionProblemBody(question.getQuestionProblemBody())
                .questionTryOrExpectingBody(question.getQuestionTryOrExpectingBody())
                .tag(tagListToQuestionTagResponseDto(tagList))
                .answers(answers)
                .build();
    }

    public List<QuestionFindAnswerDto> answersToQuestionFindAnswerDto(List<Answer> answers) {

        if (answers == null) {
            return null;
        }

        return answers.stream()
                .map(answer -> {
                    return QuestionFindAnswerDto.builder()
                            .answerId(answer.getAnswerId())
                            .answerCreatedAt(answer.getCreatedAt())
                            .answerContent(answer.getAnswerContent())
                            .answerVoteCount(answer.getAnswerVoteCount())
                            .memberId(answer.getMember().getMemberId())
                            .username(answer.getMember().getUsername())
                            .image(answer.getMember().getImage())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public QuestionVoteResponseDto questionToQuestionVoteResponseDto(Question question) {

        return QuestionVoteResponseDto.builder()
                .questionId(question.getQuestionId())
                .questionVoteCount(question.getQuestionVoteCount())
                .build();
    }
//
//    public QuestionHomeResponseDto questionToQuestionHomeResponseDto(QuestionTag questionTag) {
//
//    }

    public List<QuestionHomeDto> questionInfoToQuestionHomeDto(List<Question> questions) {

        if (questions == null) {
            return null;
        }

        return questions.stream()
                .map(question -> {
                    return QuestionHomeDto.builder()
                            .questionId(question.getQuestionId())
                            .memberId(question.getMember().getMemberId())
                            .username(question.getMember().getUsername())
                            .image(question.getMember().getImage())
                            .questionTitle(question.getQuestionTitle())
                            .questionCreatedAt(question.getCreatedAt())
//                            .questionModifiedAt(question.getModifiedAt())
                            .questionVoteCount(question.getQuestionVoteCount())
                            .questionViewCount(question.getQuestionViewCount())
                            .questionAnswerCount(question.getAnswers().size())
                            .questionProblemBody(question.getQuestionProblemBody())
                            .questionTryOrExpectingBody(question.getQuestionTryOrExpectingBody())
                            .tags(questionTagToQuestionTagResponseDto(question.getQuestionTagList()))
                            .build();
                })
                .collect(Collectors.toList());
    }

    public List<QuestionTagResponseDto> questionTagToQuestionTagResponseDto(List<QuestionTag> questionTagList){
        return questionTagList.stream()
                .map(questionTag -> {
                    return QuestionTagResponseDto.builder()
                            .tagId(questionTag.getTag().getTagId())
                            .tagName(questionTag.getTag().getTagName())
                            .tagBody(questionTag.getTag().getTagBody())
                            .tagUrl(questionTag.getTag().getTagUrl())
                            .build();
                })
                .collect(Collectors.toList());
    }

    public List<QuestionTagResponseDto> tagListToQuestionTagResponseDto(List<Tag> tagList){
        return tagList.stream()
                .map(tag -> {
                    return QuestionTagResponseDto.builder()
                            .tagId(tag.getTagId())
                            .tagName(tag.getTagName())
                            .tagBody(tag.getTagBody())
                            .tagUrl(tag.getTagUrl())
                            .build();
                })
                .collect(Collectors.toList());
    }


}
