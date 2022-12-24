package com.example.stackoverflowclone.question.repository;

import com.example.stackoverflowclone.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findByMember_MemberId(Long memberId);
//    Optional<Question> findByMemberId(Long memberId);
}
