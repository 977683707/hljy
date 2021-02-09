package com.xynl.www.service.impl;

import com.xynl.www.dao.ActivityMapper;
import com.xynl.www.domain.Activity;
import com.xynl.www.domain.Parameter;
import com.xynl.www.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityServiceImpl implements ActivityService {
    @Autowired
    private ActivityMapper activityMapper;
    @Override
    public List<Activity> findAll() {
        return activityMapper.findAll();
    }

    //    按条件查询活动
    @Override
    public List<Activity> findByParameter(Activity activity) {
        return activityMapper.findByParameter(activity);
    }

    @Override
    public Activity findById(Integer id) {
        return activityMapper.selectByPrimaryKey(id);
    }

    //修改参加用户id的集合
    @Override
    public int updateByParameter(Parameter parameter) {
        return activityMapper.updateByParameter(parameter);
    }

    @Override
    public int updateMaleById(Integer id) {
        return activityMapper.updateMaleById(id);
    }

    @Override
    public int updateFemaleById(Integer id) {
        return activityMapper.updateFemaleById(id);
    }

}
