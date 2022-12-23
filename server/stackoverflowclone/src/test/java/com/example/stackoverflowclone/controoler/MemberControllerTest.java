package com.example.stackoverflowclone.controoler;


import com.example.stackoverflowclone.member.dto.MemberPostDto;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.member.mapper.MemberMapper;
import com.example.stackoverflowclone.member.service.MemberService;
import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import javax.transaction.Transactional;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Transactional
@SpringBootTest
@AutoConfigureMockMvc
public class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private MemberMapper mapper;

    @MockBean
    private MemberService memberService;

    @Test
    void postMemberTest() throws Exception {
        // v1
//        MemberPostDto post = new MemberPostDto(
//                1L,
//                "jongsic",
//                "jong@gmail.com",
//                "1234",
//                "seoul",
//                "이름밑 제목",
//                "자기소개",
//                "imageurl",
//                "웹사이트 링크",
//                "트위터링크",
//                "깃허브 링크",
//                "풀네임");
        MemberPostDto post = new MemberPostDto(
                1L,
                "jong",
                "jong@gmail.com",
                "1234",
                "","","","","","",""

               );

        Member member = mapper.memberPostToMember(post);
        member.setMemberId(1L);

        given(memberService.createMember(Mockito.any(Member.class)))
                .willReturn(member);

        String content = gson.toJson(post);

        // when

        ResultActions actions =
                mockMvc.perform(
                        post("/api/v1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );
        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/api/v1"))));
    }

}
