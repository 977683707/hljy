package com.xynl.www.dao;

import com.xynl.www.domain.Story;

import java.util.List;

public interface StoryMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Story record);

    int insertSelective(Story record);

    Story selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Story record);

    int updateByPrimaryKey(Story record);

    //查询所有（用于成功故事主页面）
    List<Story> findAll();

    //根据id查询（用于显示详细信息）
    Story findById(Integer id);

    //按照日期排序查询
    List<Story> findBytitme();

}