package com.example.stackoverflowclone.member.entity;

import com.example.stackoverflowclone.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

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



}
