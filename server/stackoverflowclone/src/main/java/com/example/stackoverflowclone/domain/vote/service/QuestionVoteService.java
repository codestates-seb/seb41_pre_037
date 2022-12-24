package com.example.stackoverflowclone.domain.vote.service;

import com.example.stackoverflowclone.domain.vote.repository.QuestionVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionVoteService {

    private final QuestionVoteRepository questionVoteRepository;
//    public Long increaseVote(QuestionVote questionVote){
//
//
//        questionVoteRepository.save(questionVote);
//    }
//
//    public boolean getStatus(Member member, Question question){
//
//        questionVoteRepository.findBy
//    }
}
