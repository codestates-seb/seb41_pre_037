package com.example.stackoverflowclone.question.entity;


import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.audit.Auditable;
import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.question_tag.entity.QuestionTag;
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
    @OneToMany(mappedBy = "question",cascade = CascadeType.PERSIST)
    private List<QuestionTag> questionTagList = new ArrayList<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();

}
