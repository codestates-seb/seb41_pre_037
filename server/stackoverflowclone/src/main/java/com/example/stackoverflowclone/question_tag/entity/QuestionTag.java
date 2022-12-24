package com.example.stackoverflowclone.question_tag.entity;

import com.example.stackoverflowclone.audit.Auditable;
import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.tag.entity.Tag;
import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class QuestionTag extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_tag_id")
    private Long questionTagId;

    private int questionCountWithOneTag;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

}
