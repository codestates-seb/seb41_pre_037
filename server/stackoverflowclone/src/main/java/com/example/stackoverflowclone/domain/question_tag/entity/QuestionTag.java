package com.example.stackoverflowclone.domain.question_tag.entity;

import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.tag.entity.Tag;
import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
//@ToString(exclude = {"question"})
public class QuestionTag{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_tag_id")
    private Long questionTagId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

}
