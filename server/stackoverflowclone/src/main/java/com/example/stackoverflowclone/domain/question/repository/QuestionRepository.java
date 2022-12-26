package com.example.stackoverflowclone.domain.question.repository;

import com.example.stackoverflowclone.domain.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface QuestionRepository extends JpaRepository<Question, Long> {
}
