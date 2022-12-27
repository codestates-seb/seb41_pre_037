package com.example.stackoverflowclone.domain.question.repository;

import com.example.stackoverflowclone.domain.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByQuestionTitleContainsIgnoreCaseOrQuestionProblemBodyContainsIgnoreCase(String title, String bodyMain, Pageable pageable);
    Page<Question> findAllByAnswersEmpty(Pageable pageable);
//    Page<Question> findAllByQuestionTagListContainingIgnoreCase(String tagName, Pageable pageable);
    Page<Question> findAllByMemberMemberId(Long memberId, Pageable pageable);
//    Page<Question> findAllByQ(int count, Pageable pageable);
}
