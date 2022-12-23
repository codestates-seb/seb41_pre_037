package com.example.stackoverflowclone.member.service;

import com.example.stackoverflowclone.member.entity.Member;
import com.example.stackoverflowclone.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member){
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }


}
