package com.example.stackoverflowclone.tag.entity;

import com.example.stackoverflowclone.audit.Auditable;
import com.example.stackoverflowclone.question_tag.entity.QuestionTag;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Tag extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long tagId;

    @Column(name = "tag_name", unique = true)
    @NotNull
    private String tagName;

    @Column(name = "tag_body")
    @Lob
    private String tagBody;

    @Column(name = "tag_url")
    private String tagUrl;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "tag", cascade = CascadeType.PERSIST)
    private List<QuestionTag> questionTags = new ArrayList<>();

    public void addQuestionTag(QuestionTag questionTag) {
        questionTags.add(questionTag);
        questionTag.setTag(this);
    }

}
