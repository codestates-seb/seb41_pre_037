package com.example.stackoverflowclone.domain.question.repository;

import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface QuestionRepository extends JpaRepository<Question, Long> {
//    Optional<Question> findByMember_MemberId(Long memberId);
//    List<Question> findByMemberQuestion(Member member);
}
