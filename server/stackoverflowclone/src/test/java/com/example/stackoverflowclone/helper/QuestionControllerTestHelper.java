package com.example.stackoverflowclone.helper;

import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;

import java.util.Arrays;
import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface QuestionControllerTestHelper extends ControllerTestHelper {
    String QUESTION_URL = "/questions";
    String RESOURCE_URI_ID = "/{question-id}";
    String RESOURCE_URI_TITLE = "/{question-title}";

    default String getUrlCreateQuestion() {
        return QUESTION_URL + "/ask" + "/post";
    }

    default String getUriFindQuestion() {
        return QUESTION_URL + RESOURCE_URI_ID + RESOURCE_URI_TITLE;
    }

    default String getUriQuestionUpVote() {
        return QUESTION_URL + RESOURCE_URI_ID + "/vote" + "2";
    }

    default String getUriQuestionDownVote() {
        return QUESTION_URL + RESOURCE_URI_ID + "/vote" + "3";
    }

    default List<ParameterDescriptor> getMemberRequestPathParameterDescriptor() {
        return Arrays.asList(parameterWithName("member-id").description("회원 식별자 ID"));
    }

    default List<FieldDescriptor> getDefaultMemberPostRequestDescriptors() {

        return List.of(
                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                fieldWithPath("phone").type(JsonFieldType.STRING).description("휴대폰 번호")
        );
    }

    default List<FieldDescriptor> getDefaultMemberPatchRequestDescriptors() {

        return List.of(
                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자").ignored(),
                fieldWithPath("name").type(JsonFieldType.STRING).description("이름").optional(),
                fieldWithPath("phone").type(JsonFieldType.STRING).description("휴대폰 번호").optional(),
                fieldWithPath("memberStatus").type(JsonFieldType.STRING)
                        .description("회원 상태: MEMBER_ACTIVE(활동중) / MEMBER_SLEEP(휴면 계정) / MEMBER_QUIT(탈퇴)").optional()
        );
    }

    default List<FieldDescriptor> getDefaultMemberResponseDescriptors(DataResponseType dataResponseType) {
        String parentPath = getDataParentPath(dataResponseType);
        return List.of(
                fieldWithPath(parentPath.concat("memberId")).type(JsonFieldType.NUMBER).description("회원 식별자"),
                fieldWithPath(parentPath.concat("email")).type(JsonFieldType.STRING).description("이메일"),
                fieldWithPath(parentPath.concat("name")).type(JsonFieldType.STRING).description("이름"),
                fieldWithPath(parentPath.concat("phone")).type(JsonFieldType.STRING).description("휴대폰 번호"),
                fieldWithPath(parentPath.concat("memberStatus")).type(JsonFieldType.STRING)
                        .description("회원 상태: MEMBER_ACTIVE(활동중) / MEMBER_SLEEP(휴면 계정) / MEMBER_QUIT(탈퇴)"),
                fieldWithPath(parentPath.concat("stamp")).type(JsonFieldType.NUMBER).description("스탬프 갯수")
        );
    }
}
