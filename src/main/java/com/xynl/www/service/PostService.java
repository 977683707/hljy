package com.xynl.www.service;

import com.xynl.www.domain.Post;

import java.util.List;

public interface PostService {
    //查询所有文章
    List<Post> findAll();

    //查询文章详情
    Post findById(Integer id);
}
