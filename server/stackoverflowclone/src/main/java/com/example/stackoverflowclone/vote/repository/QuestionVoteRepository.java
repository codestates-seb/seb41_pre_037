package com.example.stackoverflowclone.vote.repository;

import com.example.stackoverflowclone.vote.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
//    @Query("select vote from QuestionVote vote " +
//            "join vote.account account " +
//            "join vote.question question " +
//            "where account.id = :accountId and question.id = :questionId")
//    Optional<QuestionVote> findByQuestionAndMember(@Param("memberId") Long memberId,
//                                                    @Param("questionId") Long questionId);
}
