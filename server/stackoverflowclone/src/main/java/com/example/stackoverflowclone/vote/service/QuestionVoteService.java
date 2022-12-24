package com.example.stackoverflowclone.vote.service;

import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.vote.entity.QuestionVote;
import com.example.stackoverflowclone.vote.repository.QuestionVoteRepository;
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
