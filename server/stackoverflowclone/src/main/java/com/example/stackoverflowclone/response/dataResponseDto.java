package com.example.stackoverflowclone.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class dataResponseDto<T> {
    private T data;
}
