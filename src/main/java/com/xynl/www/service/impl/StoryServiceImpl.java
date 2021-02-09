package com.xynl.www.service.impl;

import com.xynl.www.dao.StoryMapper;
import com.xynl.www.domain.Story;
import com.xynl.www.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {
    @Autowired
    private StoryMapper storyMapper;

    //查询所有（用于成功故事主页面）
    @Override
    public List<Story> findAll() {
        return storyMapper.findAll();
    }

    //
    @Override
    public Story findById(Integer id) {
        return storyMapper.findById(id);
    }

    //按照日期排序查询
    @Override
    public List<Story> findBytitme() {
        return storyMapper.findBytitme();
    }


}
