package com.xynl.www.dao;

import com.xynl.www.domain.Activity;
import com.xynl.www.domain.Parameter;

import java.util.List;

public interface ActivityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Activity record);

    int insertSelective(Activity record);

    Activity selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Activity record);

    int updateByPrimaryKey(Activity record);

    //查询所有
    List<Activity> findAll();

    //按条件查询活动
    List<Activity> findByParameter(Activity activity);

    //修改参加用户id的集合
    int updateByParameter(Parameter parameter);

    //修改男性报名人数
    int updateMaleById(Integer id);
    //修改女性报名人数
    int updateFemaleById(Integer id);
}