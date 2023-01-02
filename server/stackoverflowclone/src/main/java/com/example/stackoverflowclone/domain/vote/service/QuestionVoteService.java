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

    public void increaseVote(Member member, Question question){
        QuestionVote questionVote = findQuestionVote(member, question);

        if(questionVote.getStatus().toString().equals("UP")){
            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
        } else if(questionVote.getStatus().toString().equals("NONE")) {
            questionVote.setStatus(VoteStatus.UP);
        } else if(questionVote.getStatus().toString().equals("DOWN")) {
            questionVote.setStatus(VoteStatus.NONE);
        }
        question.setQuestionVoteCount(question.getQuestionVoteCount() + 1);
    }

    public void decreaseVote(Member member, Question question){
        QuestionVote questionVote = findQuestionVote(member, question);

        if(questionVote.getStatus().toString().equals("DOWN")){
            throw new BusinessLogicException(ExceptionCode.VOTE_NOT_ALLOW);
        } else if(questionVote.getStatus().toString().equals("NONE")) {
            questionVote.setStatus(VoteStatus.DOWN);
        } else if(questionVote.getStatus().toString().equals("UP")) {
            questionVote.setStatus(VoteStatus.NONE);
        }
        question.setQuestionVoteCount(question.getQuestionVoteCount() - 1);
    }

    public QuestionVote findQuestionVote(Member member, Question question){
        Optional<QuestionVote> findQuestionVote = questionVoteRepository.findByMemberAndQuestion(member, question);
        return !findQuestionVote.isPresent() ? createVote(member, question) : findQuestionVote.get();
    }

    public QuestionVote createVote(Member member, Question question){
        QuestionVote questionVote = QuestionVote.builder()
                .status(VoteStatus.NONE)
                .member(member)
                .question(question)
                .build();
        return questionVoteRepository.save(questionVote);
    }
}
