package com.xynl.www.service;

import com.xynl.www.domain.Activity;
import com.xynl.www.domain.Parameter;

import java.util.List;

public interface ActivityService {
    List<Activity> findAll();

    //    按条件查询活动
    List<Activity> findByParameter(Activity activity);

    //    活动详情页面跳转（根据id）
    Activity findById(Integer id);

    //修改参加用户id的集合
    int updateByParameter(Parameter parameter);

    //修改男性报名人数
    int updateMaleById(Integer id);

    //修改女性报名人数
    int updateFemaleById(Integer id);
}
