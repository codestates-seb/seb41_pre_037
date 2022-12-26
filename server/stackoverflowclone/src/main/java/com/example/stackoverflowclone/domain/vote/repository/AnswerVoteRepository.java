package com.example.stackoverflowclone.domain.vote.repository;


import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.vote.entity.AnswerVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote,Long> {
    Optional<AnswerVote> findByMemberAndAnswer(Member member, Answer answer);
}
