package com.example.stackoverflowclone.helper;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.dto.*;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.question.mapper.QuestionMapper;
import com.example.stackoverflowclone.domain.tag.entity.Tag;
import org.springframework.http.HttpMethod;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

public class StubData {
    private static Map<HttpMethod, Object> stubRequestBody;

    static {
        stubRequestBody = new HashMap<>();
        stubRequestBody.put(HttpMethod.POST, QuestionPostDto.builder()
                        .questionTitle("질문 제목 입니다.")
                        .questionProblemBody("질문 내용 1")
                        .questionTryOrExpectingBody("질문 내용 2")
                        .tag(new ArrayList<QuestionPostTagDto>(List.of(new QuestionPostTagDto("java")))) //)
                        .build());
    }

    public static class MockTag {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }
        public static List<Tag> getSingleResponseBody(){
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
            return tagList;
        }
    }

    public static class MockMember {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }

        public static Member getSingleResponseBody() {
            return Member.builder()
                    .memberId(1L)
                    .username("이재혁")
                    .email("dhfif718@naver.com")
                    .location("Seoul, KOREA")
                    .title("자기 소개 타이틀 입니다")
                    .aboutMe("자기 소개 칸 입니다")
                    .image("/home/opt/img.png")
                    .websiteLink("웹사이트 링크 칸입니다.")
                    .twitterLink("트위터 링크 칸입니다.")
                    .githubLink("깃허브 링크 칸입니다.")
                    .fullname("풀네임 칸입니다.")
                    .build();
        }
    }

    public static class MockQuestion {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }

        public static Question getSingleResponseBody(){
            return Question.builder()
                    .questionId(1L)
                    .questionTitle("질문 제목 입니다.")
                    .questionProblemBody("질문 내용1 입니다.")
                    .questionTryOrExpectingBody("질문 내용2 입니다.")
                    .questionViewCount(200)
                    .questionVoteCount(350)
                    .member(new Member())
                    .questionTagList(new ArrayList<>())
                    .answers(new ArrayList<>())
                    .build();
        }

        public static QuestionPostResponseDto getQuestionPostResponseDto(Question question, List<Tag> tagList){
            return QuestionPostResponseDto.builder()
                    .questionId(question.getQuestionId())
                    .questionTitle(question.getQuestionTitle())
                    .questionProblemBody(question.getQuestionProblemBody())
                    .questionTryOrExpectingBody(question.getQuestionTryOrExpectingBody())
                    .tag(new ArrayList<>(List.of(new QuestionTagResponseDto(1L,"java","태그 내용 입니다.",""))))
                    .build();
        }

        public static List<QuestionFindAnswerDto> getQuestionFindAnswerDto(){
            List<QuestionFindAnswerDto> list = new ArrayList<>();
            QuestionFindAnswerDto questionFindAnswerDto = QuestionFindAnswerDto.builder()
                    .answerId(1L)
                    .answerCreatedAt(LocalDateTime.now())
                    .answerContent("답변 내용입니다.")
                    .answerVoteCount(15L)
                    .memberId(1L)
                    .username("이재혁")
                    .image("https://")
                    .build();
            list.add(questionFindAnswerDto);
            return list;
        }

        public static QuestionFindResponseDto getQuestionPostResponseDto(){
            return QuestionFindResponseDto.builder()
                    .questionId(1L)
                    .memberId(1L)
                    .username("이재혁")
                    .image("https://")
                    .questionTitle("질문 제목 입니다.")
                    .questionCreatedAt(LocalDateTime.now())
                    .questionModifiedAt(LocalDateTime.now())
                    .questionVoteCount(200L)
                    .questionViewCount(350L)
                    .questionProblemBody("질문 내용1 입니다.")
                    .questionTryOrExpectingBody("질문 내용2 입니다.")
                    .tag(new ArrayList<>(List.of(new QuestionTagResponseDto(1L,"java","태그 내용 입니다.",""))))
                    .answers(getQuestionFindAnswerDto())
                    .build();
        }
    }
}
