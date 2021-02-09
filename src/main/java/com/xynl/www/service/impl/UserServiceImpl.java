package com.xynl.www.service.impl;

import com.xynl.www.dao.UserMapper;
import com.xynl.www.domain.Parameter;
import com.xynl.www.domain.User;
import com.xynl.www.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public User findById(Integer id) {
        return userMapper.selectByPrimaryKey(id);
    }

    //主页面优质会员男女
    @Override
    public List<User> findBySex(String sex) {
        return userMapper.findBySex(sex);
    }

    //登录校验
    @Override
    public User findByPhoneAndPassword(User user) {
        return userMapper.findByPhoneAndPassword(user);
    }
    //校验手机号是否被注册
    @Override
    public User checkPhone(String phone) {
        return userMapper.findByPhone(phone);
    }

    @Override
    public int registUser(User user) {
        int i = userMapper.insertSelective(user);
        return i;
    }

    @Override
    public List<User> filterUser(Parameter parameter) {
        List<User> userList = userMapper.findByParamter(parameter);
        return userList;
    }

    @Override
    public List<User> findAll() {
        return userMapper.findAll();
    }
}
