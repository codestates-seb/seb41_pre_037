package com.example.stackoverflowclone.domain.member.repository;

import com.example.stackoverflowclone.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Queue;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findAllByMemberIdAndEmail(Long id, String email);

    Page<Member> findAllByUsernameContainsIgnoreCase(String Name, Pageable pageable);

}
