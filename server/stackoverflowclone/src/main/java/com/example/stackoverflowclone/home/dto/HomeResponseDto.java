package com.example.stackoverflowclone.home.dto;

import com.example.stackoverflowclone.question.entity.Question;
import com.example.stackoverflowclone.response.PageInfo;
import com.example.stackoverflowclone.tag.entity.Tag;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class HomeResponseDto {
    private long questionAmount;
    private List<Question> questions = new ArrayList<>();

}
