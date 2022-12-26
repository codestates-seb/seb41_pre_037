package com.example.stackoverflowclone.domain.question.repository;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.desktop.QuitEvent;
import java.util.List;
import java.util.Optional;


public interface QuestionRepository extends JpaRepository<Question, Long> {
//    Page<Question> findAllByQuestionTitleOrQuestionProblemBodyOrQuestionTryOrExpectingBody(String Title, String problemBody, String tryOrExpectingBody,
//                                                                                           Pageable pageable);
//    List<Question> findByMemberQuestion(Member member);
}
