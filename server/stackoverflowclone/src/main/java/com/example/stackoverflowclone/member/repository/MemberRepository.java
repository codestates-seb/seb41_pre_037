package com.example.stackoverflowclone.member.repository;

import com.example.stackoverflowclone.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member,Long> {

}
