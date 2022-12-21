package com.example.stackoverflowclone.answer.repository;

import com.example.stackoverflowclone.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
