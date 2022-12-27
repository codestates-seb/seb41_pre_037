package com.example.stackoverflowclone.domain.question.repository;

import com.example.stackoverflowclone.domain.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByQuestionTitleContainsOrQuestionProblemBodyContains(String title, String bodyMain, Pageable pageable);
    Page<Question> findAllByAnswersEmpty(Pageable pageable);
    Page<Question> findAllByQuestionTagListContains(String tagName, Pageable pageable);
}
