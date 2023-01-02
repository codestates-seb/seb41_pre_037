package com.example.stackoverflowclone.domain.vote.repository;

import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.vote.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
    Optional<QuestionVote> findByMemberAndQuestion(Member member, Question question);
}
