package com.example.stackoverflowclone.domain.question.controller;

import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.member.service.MemberService;
import com.example.stackoverflowclone.domain.question.dto.QuestionFindAnswerDto;
import com.example.stackoverflowclone.domain.question.dto.QuestionFindResponseDto;
import com.example.stackoverflowclone.domain.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.domain.question.dto.QuestionPostResponseDto;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.mapper.QuestionMapper;
import com.example.stackoverflowclone.domain.question.service.QuestionService;
import com.example.stackoverflowclone.domain.tag.entity.Tag;
import com.example.stackoverflowclone.domain.tag.service.TagService;
import com.example.stackoverflowclone.domain.vote.service.QuestionVoteService;
import com.example.stackoverflowclone.global.time.AnswerTimeStamp;
import com.example.stackoverflowclone.global.time.QuestionTimeStamp;
import com.example.stackoverflowclone.helper.QuestionControllerTestHelper;
import com.example.stackoverflowclone.helper.StubData;
import com.example.stackoverflowclone.helper.WithMockCustomUser;
import com.example.stackoverflowclone.util.ApiDocumentUtils;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@WebMvcTest(QuestionController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class QuestionControllerTest implements QuestionControllerTestHelper {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private  MemberService memberService;

    @MockBean
    private  TagService tagService;

    @MockBean
    private  QuestionService questionService;

    @MockBean
    private  QuestionMapper questionMapper;

    @MockBean
    private  QuestionVoteService questionVoteService;

    @Test
    @DisplayName("애노테이션 API : 커스텀 어너테이션 테스트")
    @WithMockCustomUser
    void customWithMockTest() throws Exception {
        this.mockMvc.perform(get("/questions/test")
                        .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andDo(print()).andExpect(status().isCreated());
    }

    @Test
    @DisplayName("질문 작성 API : createQuestion")
    @WithMockCustomUser
//    @WithMockUser
    void createQuestion() throws Exception {

        QuestionPostDto questionPostDto = (QuestionPostDto) StubData.MockQuestion.getRequestBody(HttpMethod.POST);
        Question question = StubData.MockQuestion.getSingleResponseBody();
        List<Tag> tagList = StubData.MockTag.getSingleResponseBody();
        Member member = StubData.MockMember.getSingleResponseBody();
        QuestionPostResponseDto questionPostResponseDto = StubData.MockQuestion.getQuestionPostResponseDto(question, tagList);

        given(tagService.findTags(Mockito.any(QuestionPostDto.class))).willReturn(tagList);
        given(memberService.findMember(Mockito.anyLong())).willReturn(member);
        given(questionService.postQuestion(Mockito.any())).willReturn(question);
        given(questionMapper.questionTagListToQuestionPostResponseDto(Mockito.any(),Mockito.any())).willReturn(questionPostResponseDto);

        String content = toJsonContent(questionPostDto);
        ResultActions actions = mockMvc.perform(postRequestBuilder(getUrlCreateQuestion(), content));

        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.questionId").value(questionPostResponseDto.getQuestionId()))
                .andExpect(jsonPath("$.data.questionTitle").value(questionPostResponseDto.getQuestionTitle()))
                .andExpect(jsonPath("$.data.questionProblemBody").value(questionPostResponseDto.getQuestionProblemBody()))
                .andExpect(jsonPath("$.data.questionTryOrExpectingBody").value(questionPostResponseDto.getQuestionTryOrExpectingBody()))
                .andExpect(jsonPath("$.data.tag.[0].tagId").value(questionPostResponseDto.getTag().get(0).getTagId()))
                .andExpect(jsonPath("$.data.tag.[0].tagName").value(questionPostResponseDto.getTag().get(0).getTagName()))
                .andExpect(jsonPath("$.data.tag.[0].tagBody").value(questionPostResponseDto.getTag().get(0).getTagBody()))
                .andExpect(jsonPath("$.data.tag.[0].tagUrl").value(questionPostResponseDto.getTag().get(0).getTagUrl()))
                .andDo(document( "post-question",
                        ApiDocumentUtils.getRequestPreProcessor(),
                        ApiDocumentUtils.getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("questionTitle").type(JsonFieldType.STRING).description("질문 제목").ignored(),
                                        fieldWithPath("questionProblemBody").type(JsonFieldType.STRING).description("질문 내용 1").optional(),
                                        fieldWithPath("questionTryOrExpectingBody").type(JsonFieldType.STRING).description("질문 내용 2").optional(),
                                        fieldWithPath("tag").type(JsonFieldType.ARRAY).description("태그"),
                                        fieldWithPath("tag[].tagName").type(JsonFieldType.STRING).description("태그 이름")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data").type(JsonFieldType.OBJECT).description("결과 데이터").optional(),
                                        fieldWithPath("data.questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("data.questionTitle").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("data.questionProblemBody").type(JsonFieldType.STRING).description("질문 내용 1"),
                                        fieldWithPath("data.questionTryOrExpectingBody").type(JsonFieldType.STRING).description("질문 내용 2"),
                                        fieldWithPath("data.tag").type(JsonFieldType.ARRAY).description("태그 결과 데이터").optional(),
                                        fieldWithPath("data.tag[].tagId").type(JsonFieldType.NUMBER).description("태그 식별자"),
                                        fieldWithPath("data.tag[].tagName").type(JsonFieldType.STRING).description("태그 이름"),
                                        fieldWithPath("data.tag[].tagBody").type(JsonFieldType.STRING).description("내그 내용"),
                                        fieldWithPath("data.tag[].tagUrl").type(JsonFieldType.STRING).description("태그 URL")
                                )
                        )
                ));

    }
    @Test
    @DisplayName("질문 게시글 선택 조회 API : findQuestion")
    @WithMockCustomUser
    void findQuestion()throws Exception {

        Question question = StubData.MockQuestion.getSingleResponseBody();
        List<Tag> tagList = StubData.MockTag.getSingleResponseBody();
        List<QuestionFindAnswerDto> questionFindAnswerDto = StubData.MockQuestion.getQuestionFindAnswerDto();
        QuestionFindResponseDto questionFindResponseDto = StubData.MockQuestion.getQuestionPostResponseDto();

        given(questionService.findQuestion(Mockito.anyLong())).willReturn(question);
        given(tagService.findTags(Mockito.anyList())).willReturn(tagList);
        given(questionMapper.answersToQuestionFindAnswerDto(Mockito.anyList())).willReturn(questionFindAnswerDto);
        given(questionMapper.questionInfoToQuestionFindResponseDto(Mockito.any(),Mockito.any(),Mockito.anyList(),Mockito.anyList()))
                .willReturn(questionFindResponseDto);

        ResultActions actions = mockMvc.perform(getRequestBuilder(getUriFindQuestion(),1L,"제목입니다"));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.questionId").value(questionFindResponseDto.getQuestionId()))
                .andExpect(jsonPath("$.data.memberId").value(questionFindResponseDto.getMemberId()))
                .andExpect(jsonPath("$.data.username").value(questionFindResponseDto.getUsername()))
                .andExpect(jsonPath("$.data.image").value(questionFindResponseDto.getImage()))
                .andExpect(jsonPath("$.data.questionTitle").value(questionFindResponseDto.getQuestionTitle()))
                .andExpect(jsonPath("$.data.questionCreatedAt").exists())
                .andExpect(jsonPath("$.data.questionModifiedAt").exists())
                .andExpect(jsonPath("$.data.questionVoteCount").value(questionFindResponseDto.getQuestionVoteCount()))
                .andExpect(jsonPath("$.data.questionViewCount").value(questionFindResponseDto.getQuestionViewCount()))
                .andExpect(jsonPath("$.data.questionProblemBody").value(questionFindResponseDto.getQuestionProblemBody()))
                .andExpect(jsonPath("$.data.questionTryOrExpectingBody").value(questionFindResponseDto.getQuestionTryOrExpectingBody()))
                .andExpect(jsonPath("$.data.tag.[0].tagId").value(questionFindResponseDto.getTag().get(0).getTagId()))
                .andExpect(jsonPath("$.data.tag.[0].tagName").value(questionFindResponseDto.getTag().get(0).getTagName()))
                .andExpect(jsonPath("$.data.tag.[0].tagBody").value(questionFindResponseDto.getTag().get(0).getTagBody()))
                .andExpect(jsonPath("$.data.tag.[0].tagUrl").value(questionFindResponseDto.getTag().get(0).getTagUrl()))
                .andExpect(jsonPath("$.data.answers.[0].answerId").value(questionFindResponseDto.getAnswers().get(0).getAnswerId()))
                .andExpect(jsonPath("$.data.answers.[0].answerCreatedAt").exists())
                .andExpect(jsonPath("$.data.answers.[0].answerContent").value(questionFindResponseDto.getAnswers().get(0).getAnswerContent()))
                .andExpect(jsonPath("$.data.answers.[0].answerVoteCount").value(questionFindResponseDto.getAnswers().get(0).getAnswerVoteCount()))
                .andExpect(jsonPath("$.data.answers.[0].memberId").value(questionFindResponseDto.getAnswers().get(0).getMemberId()))
                .andExpect(jsonPath("$.data.answers.[0].username").value(questionFindResponseDto.getAnswers().get(0).getUsername()))
                .andExpect(jsonPath("$.data.answers.[0].image").value(questionFindResponseDto.getAnswers().get(0).getImage()));
    }

}