package com.example.stackoverflowclone.question.repository;

import com.example.stackoverflowclone.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;


public interface QuestionRepository extends JpaRepository<Question, Long> {
}
