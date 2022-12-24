package com.example.stackoverflowclone.domain.vote.service;

import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.domain.vote.entity.QuestionVote;
import com.example.stackoverflowclone.domain.vote.repository.QuestionVoteRepository;
import com.example.stackoverflowclone.global.enums.VoteStatus;
import com.example.stackoverflowclone.global.exception.BusinessLogicException;
import com.example.stackoverflowclone.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionVoteService {

    private final QuestionVoteRepository questionVoteRepository;
//    public Long increaseVote(QuestionVote questionVote){
//
//        questionVoteRepository.save(questionVote);
//    }

    public String getStatus(Member member, Question question){

        Optional<QuestionVote> byMemberAndQuestion = questionVoteRepository.findByMemberAndQuestion(member, question);
        QuestionVote questionVote = byMemberAndQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.VOTE_NOT_FOUND));

        return questionVote.getStatus().toString();
    }
}
