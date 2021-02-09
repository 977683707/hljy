package com.xynl.www.service;

import com.xynl.www.domain.Parameter;
import com.xynl.www.domain.User;

import java.util.List;

public interface UserService {

    //更具手机号号密码查询用户，用于登录功能
    User findByPhoneAndPassword(User user);
    //校验手机号是否被注册
    User checkPhone(String phone);

    //注册账号
    int registUser(User user);

    //交朋识友页面筛选用
    List<User> filterUser(Parameter parameter);

    //交朋识友页面点击最多用
    List<User> findAll();

    //用于用户详情页的显示
    User findById(Integer id);

    //主页面优质会员男女
    List<User> findBySex(String sex);
}
