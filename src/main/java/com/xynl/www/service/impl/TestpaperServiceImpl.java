package com.xynl.www.service.impl;

import com.xynl.www.dao.TestpaperMapper;
import com.xynl.www.domain.Testpaper;
import com.xynl.www.service.TestpaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestpaperServiceImpl implements TestpaperService {
    @Autowired
    private TestpaperMapper testpaperMapper;

    //按题目模糊搜索
    @Override
    public List<Testpaper> findByName(String name) {
        return testpaperMapper.findByName(name);
    }

    //搜索全部
    @Override
    public List<Testpaper> findAll() {
        return testpaperMapper.findAll();
    }

    //按id搜索
    @Override
    public Testpaper findById(Integer id) {
        return testpaperMapper.selectByPrimaryKey(id);
    }
}
