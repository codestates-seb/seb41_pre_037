package com.example.stackoverflowclone.member.entity;

import com.example.stackoverflowclone.answer.entity.Answer;
import com.example.stackoverflowclone.audit.Auditable;
import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.vote.entity.AnswerVote;
import com.example.stackoverflowclone.vote.entity.QuestionVote;
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

    @OneToMany(mappedBy = "member")
    private List<Question> questionList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<QuestionVote> questionVoteList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Answer> answersList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<AnswerVote> answerVoteList = new ArrayList<>();

}
