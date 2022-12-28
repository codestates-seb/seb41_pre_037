package com.example.stackoverflowclone.domain.member.service;

import com.example.stackoverflowclone.global.enums.ProfileImage;
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

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    public Member createMember(Member member){

        verifyExistsEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        createProfileImage(member);
        return memberRepository.save(member);
    }

    public Member createMemberOAuth2(Member member){
        Optional<Member> findMember = memberRepository.findByEmail(member.getEmail());
        if(findMember.isPresent()){
            return findMember.get();
        }
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        verifyExistsEmail(member.getEmail());
        return memberRepository.save(member);
    }

    public Member findMemberEmail(String email){
        Optional<Member> findMember = memberRepository.findByEmail(email);
        return findMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.EMAIL_NOT_FOUND));
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
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
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
        return findMember;
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);
        memberRepository.delete(findMember);
    }
    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public ProfileImage createProfileImage(Member member){
        ProfileImage[] randomImageList = ProfileImage.values();
        Long profileImageIndex = Long.valueOf((int) (Math.random()*14)+1 % randomImageList.length);

        List<ProfileImage> profileImageList = Arrays.stream(randomImageList)
                .filter(image -> image.getIndex() == profileImageIndex)
                .collect(Collectors.toList());

        ProfileImage profileImage = profileImageList.get(0);
        member.setImage(profileImage.getUrl());
        return profileImage;
    }
    public String timestamp(Member member){
        LocalDateTime now = LocalDateTime.now(); // 현재시간
//        LocalDateTime date = LocalDateTime.of(2022,12,25,0,0,0); // 생성시간 테스트
        LocalDateTime date = member.getCreatedAt(); // 실제 생성시간
        System.out.println("현재시간 = "+now);
        System.out.println("생성시간 = "+date);
        long days = ChronoUnit.DAYS.between(date, now);
        long months = ChronoUnit.MONTHS.between(date, now);
        long years = ChronoUnit.YEARS.between(date, now);
        // 프로필
        System.out.println("================= 프로필 =================");
//        System.out.println("member for "+ days +" Day"); //
//        System.out.println("Last seen this week");
//        System.out.println("Visited "+ days +" days," + days +" consecutive"); // 연속 방문 일수  -> ???
//        System.out.println("=========================================");
        String str = "member for ";
        if (years%100 != 0){
            str += years%100+" years";
        }
        if(months%12 != 0){
            str += months%12 + " month";
        }
        str += days%30+" days";
        System.out.println("=========================================");
        return str;
    }
}
