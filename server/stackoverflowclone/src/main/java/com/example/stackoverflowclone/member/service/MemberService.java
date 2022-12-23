package com.example.stackoverflowclone.member.service;

import com.example.stackoverflowclone.exception.BusinessLogicException;
import com.example.stackoverflowclone.exception.ExceptionCode;
import com.example.stackoverflowclone.member.entity.Member;

import com.example.stackoverflowclone.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Member createMember(Member member){
//        findMemberEmail(member.getEmail());
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public Member findMemberEmail(String email){
        Optional<Member> findMember = memberRepository.findByEmail(email);
        /*
         * 리펙토링 포인트 -> Exception 비지니스 예외로직으로 만들 예정
         * */
        return findMember.orElseThrow(() ->
                new RuntimeException("해당 email로 멤버를 찾을 수 없습니다."));
    }

    @Transactional(readOnly = true)
    public Member findByMember(Long memberId){
        return findVerifiedMember(memberId);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        return optionalMember.orElseThrow(() ->
                        new RuntimeException("찾을 수 없다"));
    }
}
