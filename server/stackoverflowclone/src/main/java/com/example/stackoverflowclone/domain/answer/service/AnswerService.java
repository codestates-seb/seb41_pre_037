package com.example.stackoverflowclone.domain.answer.service;

import com.example.stackoverflowclone.domain.answer.entity.Answer;
import com.example.stackoverflowclone.domain.answer.repository.AnswerRepository;
import com.example.stackoverflowclone.domain.question.entity.Question;
import com.example.stackoverflowclone.global.exception.BusinessLogicException;
import com.example.stackoverflowclone.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;

    public Answer postAnswer(Answer answer){
        return answerRepository.save(answer);
    }

    public void deleteAnswer(Long answerId, Long memberId){
        Answer answer = findAnswer(answerId);

        Long compareMemberId = answer.getMember().getMemberId();
        if(memberId != compareMemberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_ALLOW);
        }
        answerRepository.delete(answer);
    }

    public Answer findAnswer(Long answerId){
        Optional<Answer> findAnswer = answerRepository.findById(answerId);
        return findAnswer.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }

}
