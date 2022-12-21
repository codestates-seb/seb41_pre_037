package com.example.stackoverflowclone.vote.repository;

import com.example.stackoverflowclone.vote.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
}
