package com.example.stackoverflowclone.domain.vote.entity;

import com.example.stackoverflowclone.global.audit.Auditable;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.global.enums.VoteStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
//@ToString(exclude = {"member"})
public class QuestionVote extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_vote_id")
    private Long questionVoteId;

    @Enumerated(EnumType.STRING)
    private VoteStatus status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
