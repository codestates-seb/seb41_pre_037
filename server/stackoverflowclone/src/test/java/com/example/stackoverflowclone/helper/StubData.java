package com.example.stackoverflowclone.helper;

import com.example.stackoverflowclone.domain.question.dto.QuestionPostDto;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.tag.entity.Tag;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;

import java.util.*;

public class StubData {
    private static Map<HttpMethod, Object> stubRequestBody;

    static {
        List<Tag> tagList = new ArrayList<>();
        tagList.add(Tag.builder()
                .tagId(1L)
                .tagName("java")
                .tagBody("java 바디 내용입니다.")
                .tagUrl("")
                .build());
        tagList.add(Tag.builder()
                .tagId(2L)
                .tagName("javascript")
                .tagBody("javascript 바디 내용입니다.")
                .tagUrl("")
                .build());

        stubRequestBody = new HashMap<>();
        stubRequestBody.put(HttpMethod.POST, QuestionPostDto.builder()
                        .email("dhfif718@gmail.com")
                        .questionTitle("질문 제목 입니다.")
                        .questionProblemBody("질문 내용 1")
                        .questionTryOrExpectingBody("질문 내용 2")
                        .tag(tagList)
                        .build());
    }

    public static class MockMember {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }
    }

    public static class MockQuestion {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }
        public static Question getSingleResponseBody(long questionId) {
            Question question = new Question();
            question.setQuestionId(questionId);

            return question;
        }
    }
}
