package com.xynl.www.service;

import com.xynl.www.domain.Testpaper;

import java.util.List;

public interface TestpaperService {

    //按题目模糊搜索
    List<Testpaper> findByName(String name);

    //搜索全部
    List<Testpaper> findAll();

    //按id搜索
    Testpaper findById(Integer id);
}
