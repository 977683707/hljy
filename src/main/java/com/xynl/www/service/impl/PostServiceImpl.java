package com.xynl.www.service.impl;

import com.xynl.www.dao.PostMapper;
import com.xynl.www.domain.Post;
import com.xynl.www.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostMapper postMapperm;
    @Override
    public List<Post> findAll() {
        return postMapperm.findAll();
    }

    //查询文章详情
    @Override
    public Post findById(Integer id) {
        return postMapperm.selectByPrimaryKey(id);
    }
}
