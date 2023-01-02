package com.example.stackoverflowclone.domain.answer.entity;

import com.example.stackoverflowclone.domain.question_tag.entity.QuestionTag;
import com.example.stackoverflowclone.domain.vote.entity.AnswerVote;
import com.example.stackoverflowclone.global.audit.Auditable;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class Answer extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long answerId;

    @Lob
    @Column(name = "answer_content")
    private String answerContent;

    @Column(name = "answer_vote_count")
    private long answerVoteCount;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "answer", cascade = CascadeType.REMOVE)
    private List<AnswerVote> answerVotes = new ArrayList<>();


    public Answer(String answerContent) {
        this.answerContent = answerContent;
    }
}
