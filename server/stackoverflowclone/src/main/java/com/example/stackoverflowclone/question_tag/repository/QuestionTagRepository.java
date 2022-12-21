package com.example.stackoverflowclone.question_tag.repository;

import com.example.stackoverflowclone.question_tag.entity.QuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionTagRepository extends JpaRepository<QuestionTag,Long> {
}
