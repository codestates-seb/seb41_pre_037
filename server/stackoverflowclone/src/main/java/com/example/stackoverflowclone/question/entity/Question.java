package com.example.stackoverflowclone.question.entity;


import com.example.stackoverflowclone.audit.Auditable;
import com.example.stackoverflowclone.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @Column(name = "question_title")
    @NotNull
    private String questionTitle = "No Title";

    @Column(name = "question_problem_body")
    private String questionProblemBody = "";

    @Column(name = "question_try_or_expecting_body")
    private String questionTryOrExpectingBody = "";

    @Column(name = "question_view_count")
    private long questionViewCount;

    @Column(name = "question_vote_count")
    private long questionVoteCount;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
