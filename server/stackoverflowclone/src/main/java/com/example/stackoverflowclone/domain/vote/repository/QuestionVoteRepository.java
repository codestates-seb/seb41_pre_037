package com.example.stackoverflowclone.domain.vote.repository;

import com.example.stackoverflowclone.domain.vote.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
//    @Query("select vote from QuestionVote vote " +
//            "join vote.account account " +
//            "join vote.question question " +
//            "where account.id = :accountId and question.id = :questionId")
//    Optional<QuestionVote> findByQuestionAndMember(@Param("memberId") Long memberId,
//                                                    @Param("questionId") Long questionId);
}
