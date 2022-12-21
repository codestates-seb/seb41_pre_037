package com.example.stackoverflowclone.vote.repository;


import com.example.stackoverflowclone.vote.entity.AnswerVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote,Long> {
}
