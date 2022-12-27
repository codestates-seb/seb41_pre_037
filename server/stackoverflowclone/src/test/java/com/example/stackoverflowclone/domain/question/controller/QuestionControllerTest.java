package com.example.stackoverflowclone.domain.question.controller;

import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.member.service.MemberService;
import com.example.stackoverflowclone.domain.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.domain.question.dto.QuestionPostResponseDto;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.mapper.QuestionMapper;
import com.example.stackoverflowclone.domain.question.service.QuestionService;
import com.example.stackoverflowclone.domain.tag.entity.Tag;
import com.example.stackoverflowclone.domain.tag.service.TagService;
import com.example.stackoverflowclone.domain.vote.service.QuestionVoteService;
import com.example.stackoverflowclone.global.security.auth.jwt.JwtTokenizer;
import com.example.stackoverflowclone.helper.QuestionControllerTestHelper;
import com.example.stackoverflowclone.helper.StubData;
import com.example.stackoverflowclone.helper.WithMockCustomUser;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
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
        Question question = StubData.MockQuestion.getSingleResponseBody(1L);
        List<Tag> tagList = StubData.MockTag.getSingleResponseBody();
        Member member = StubData.MockMember.getSingleResponseBody(1L);
        QuestionPostResponseDto questionTagListToQuestionPostResponseDto = StubData.MockQuestion.getQuestionTagListToQuestionPostResponseDto(question, tagList);

        given(tagService.findTags(Mockito.any(QuestionPostDto.class))).willReturn(tagList);
        given(memberService.findByMember(Mockito.anyLong())).willReturn(member);
        given(questionService.postQuestion(Mockito.any())).willReturn(question);
        given(questionMapper.questionTagListToQuestionPostResponseDto(Mockito.any(),Mockito.any())).willReturn(questionTagListToQuestionPostResponseDto);

        String content = toJsonContent(questionPostDto);
        ResultActions actions = mockMvc.perform(postRequestBuilder(getUrlCreateQuestion(), content));

        actions
                .andExpect(status().isCreated());
    }
    @Test
    void findQuestion()throws Exception {
        //given(questionService.findQuestion(Mockito.anyLong())).willReturn();
        //given(tagService.findTags(Mockito.anyList())).willReturn();
    }

}