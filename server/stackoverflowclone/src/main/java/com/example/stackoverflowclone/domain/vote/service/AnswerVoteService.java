package com.example.stackoverflowclone.domain.vote.service;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.member.entity.Member;
import com.example.stackoverflowclone.domain.vote.entity.AnswerVote;
import com.example.stackoverflowclone.domain.vote.repository.AnswerVoteRepository;
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
public class AnswerVoteService {

    private final AnswerVoteRepository answerVoteRepository;

    public void increaseVote(Member member, Answer answer){
        AnswerVote answerVote = findAnswerVote(member, answer);

        if(answerVote.getStatus().toString().equals("UP")){
            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
        } else if(answerVote.getStatus().toString().equals("NONE")) {
            answerVote.setStatus(VoteStatus.UP);
        } else if(answerVote.getStatus().toString().equals("DOWN")) {
            answerVote.setStatus(VoteStatus.NONE);
        }
        answer.setAnswerVoteCount(answer.getAnswerVoteCount() + 1);
    }

    public void decreaseVote(Member member, Answer answer){
        AnswerVote answerVote = findAnswerVote(member, answer);

        if(answerVote.getStatus().toString().equals("DOWN")){
            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
        } else if(answerVote.getStatus().toString().equals("NONE")) {
            answerVote.setStatus(VoteStatus.DOWN);
        } else if(answerVote.getStatus().toString().equals("UP")) {
            answerVote.setStatus(VoteStatus.NONE);
        }
        answer.setAnswerVoteCount(answer.getAnswerVoteCount() - 1);
    }

    public AnswerVote findAnswerVote(Member member, Answer answer){
        Optional<AnswerVote> findAnswerVote = answerVoteRepository.findByMemberAndAnswer(member, answer);
        return !findAnswerVote.isPresent() ? createVote(member, answer) : findAnswerVote.get();
    }

    public AnswerVote createVote(Member member, Answer answer){
        AnswerVote answerVote = AnswerVote.builder()
                .status(VoteStatus.NONE)
                .member(member)
                .answer(answer)
                .build();
        return answerVoteRepository.save(answerVote);
    }
}
