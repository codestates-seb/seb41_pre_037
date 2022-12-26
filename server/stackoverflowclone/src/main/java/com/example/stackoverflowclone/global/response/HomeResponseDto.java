package com.example.stackoverflowclone.global.response;

import com.example.stackoverflowclone.global.response.PageInfo;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;


@Data
public class HomeResponseDto<Question> {
    private long total;
    private List<Question> data;
    private PageInfo pageInfo;

    public HomeResponseDto(long data, List<Question> questions, Page page) {
        this.total = data;
        this.data = questions;
        this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
