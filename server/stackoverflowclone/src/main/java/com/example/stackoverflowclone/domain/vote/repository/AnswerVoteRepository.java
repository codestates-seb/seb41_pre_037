package com.example.stackoverflowclone.domain.vote.repository;


import com.example.stackoverflowclone.domain.vote.entity.AnswerVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote,Long> {
}
