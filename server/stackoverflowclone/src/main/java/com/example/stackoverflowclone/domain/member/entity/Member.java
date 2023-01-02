package com.example.stackoverflowclone.domain.member.entity;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.global.audit.Auditable;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.vote.entity.AnswerVote;
import com.example.stackoverflowclone.domain.vote.entity.QuestionVote;
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
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "username")
    @NotNull
    private String username;

    @Column(name = "email", unique = true)
    @NotNull
    private String email;

    @Column(name = "password")
    @NotNull
    private String password;

    @Column(name = "location")
    private String location;

    @Column(name = "title")
    private String title;

    @Column(name = "about_me")
    private String aboutMe;

    @Column(name = "image")
    private String image;

    @Column(name = "website_link")
    private String websiteLink;

    @Column(name = "twitter_link")
    private String twitterLink;

    @Column(name = "github_link")
    private String githubLink;

    @Column(name = "fullname")
    private String fullname;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Question> questionList = new ArrayList<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<QuestionVote> questionVoteList = new ArrayList<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Answer> answersList = new ArrayList<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<AnswerVote> answerVoteList = new ArrayList<>();

    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}
