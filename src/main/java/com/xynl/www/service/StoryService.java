package com.xynl.www.service;

import com.xynl.www.domain.Story;

import java.util.List;

public interface StoryService {

    //查询所有（用于成功故事主页面）
    List<Story> findAll();

    //根据id查询（用于显示详细信息）
    Story findById(Integer id);

    //按照日期排序查询
    List<Story> findBytitme();
}
