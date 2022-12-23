package com.example.stackoverflowclone.tag.repository;

import com.example.stackoverflowclone.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
public interface TagRepository extends JpaRepository<Tag,Long> {
    Optional<Tag> findByTagName(String tagName);
}
