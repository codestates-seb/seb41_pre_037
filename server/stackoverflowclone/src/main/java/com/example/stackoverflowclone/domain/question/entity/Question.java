package com.example.stackoverflowclone.domain.question.entity;


import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.global.audit.Auditable;
import com.example.stackoverflowclone.domain.question_tag.entity.QuestionTag;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
//@ToString(exclude = {"member"})
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @Builder.Default
    @Column(name = "question_title")
    @NotNull
    private String questionTitle = "No Title";

    @Builder.Default
    @Column(name = "question_problem_body")
    private String questionProblemBody = "";

    @Builder.Default
    @Column(name = "question_try_or_expecting_body")
    private String questionTryOrExpectingBody = "";

    @Column(name = "question_view_count")
    private long questionViewCount;

    @Column(name = "question_vote_count")
    private long questionVoteCount;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "question",cascade = CascadeType.PERSIST) // TODO : 게시글 삭제시 CascadeType.REMOVE 테스트 필요
    private List<QuestionTag> questionTagList = new ArrayList<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "question") // TODO : 게시글 삭제시 CascadeType.REMOVE 테스트 필요
    private List<Answer> answers = new ArrayList<>();
    public void addQuestionTagList(QuestionTag questionTag) {
        questionTagList.add(questionTag);
        questionTag.setQuestion(this);
    }
}
