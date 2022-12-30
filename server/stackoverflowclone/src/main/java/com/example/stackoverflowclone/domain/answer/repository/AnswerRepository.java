package com.example.stackoverflowclone.domain.answer.repository;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
