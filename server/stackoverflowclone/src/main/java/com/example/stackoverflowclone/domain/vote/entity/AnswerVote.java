package com.example.stackoverflowclone.domain.vote.entity;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.global.audit.Auditable;
import com.example.stackoverflowclone.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class AnswerVote extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_vote_id")
    private Long answerVoteId;

    @Column(name = "status")
    private boolean status;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
