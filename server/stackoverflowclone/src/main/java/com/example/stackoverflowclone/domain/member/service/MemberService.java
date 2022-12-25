package com.example.stackoverflowclone.domain.member.service;

import com.example.stackoverflowclone.global.exception.BusinessLogicException;
import com.example.stackoverflowclone.global.exception.ExceptionCode;
import com.example.stackoverflowclone.global.security.auth.utils.CustomAuthorityUtils;
import com.example.stackoverflowclone.domain.member.entity.Member;

import com.example.stackoverflowclone.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    public Member createMember(Member member){

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        verifyExistsEmail(member.getEmail());
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
    public void verifyExistsEmail(String email){
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if (findMember.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS); // void
    }
    @Transactional(readOnly = true)
    public Member findByMember(Long memberId){
        return findVerifiedMember(memberId);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
    @Transactional
    public Member updateMember(Member member){
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getUsername())
                .ifPresent(name -> findMember.setUsername(name));
        Optional.ofNullable(member.getLocation())
                .ifPresent(location -> findMember.setLocation(location));
        Optional.ofNullable(member.getTitle())
                .ifPresent( title -> findMember.setTitle(title));
        Optional.ofNullable(member.getAboutMe())
                .ifPresent( about -> findMember.setAboutMe(about));
        Optional.ofNullable(member.getImage())
                .ifPresent( image -> findMember.setImage(image));
        Optional.ofNullable(member.getWebsiteLink())
                .ifPresent( websitelink -> findMember.setWebsiteLink(websitelink));
        Optional.ofNullable(member.getTwitterLink())
                .ifPresent( twitterlink -> findMember.setTwitterLink(twitterlink));
        Optional.ofNullable(member.getGithubLink())
                .ifPresent( githublink -> findMember.setGithubLink(githublink));
        Optional.ofNullable(member.getFullname())
                .ifPresent( fullname -> findMember.setFullname(fullname));
        return memberRepository.save(findMember);
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        memberRepository.delete(findMember);
    }
    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

}
