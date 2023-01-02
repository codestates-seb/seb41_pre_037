package com.example.stackoverflowclone.domain.tag.repository;

import com.example.stackoverflowclone.domain.tag.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagName(String tagName);

    Page<Tag> findAll(Pageable pageable);

    Page<Tag> findAllByTagNameContainingIgnoreCase(String tagName, Pageable pageable);
}
