package com.xynl.www.dao;

import com.xynl.www.domain.Parameter;
import com.xynl.www.domain.User;

import java.util.List;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    User findByPhoneAndPassword(User user);

    User findByPhone(String phone);

    //交朋识友页面筛选用
    List<User> findByParamter(Parameter parameter);

    //交朋识友页面点击最多用
    List<User> findAll();

    //主页面优质会员男女
    List<User> findBySex(String sex);
}