package com.example.stackoverflowclone.domain.member.entity;

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
public class MemberRoles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberrole_id")
    private Long memberRoleId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
