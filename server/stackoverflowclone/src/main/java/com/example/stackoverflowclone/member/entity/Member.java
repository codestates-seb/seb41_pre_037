package com.example.stackoverflowclone.member.entity;

import lombok.*;

import javax.persistence.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_Id",nullable = true, updatable = true, unique = false)
    private Long memberId;


}
