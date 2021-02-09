package com.xynl.www.dao;

import com.xynl.www.domain.Testpaper;

import java.util.List;

public interface TestpaperMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Testpaper record);

    int insertSelective(Testpaper record);

    Testpaper selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Testpaper record);

    int updateByPrimaryKeyWithBLOBs(Testpaper record);

    int updateByPrimaryKey(Testpaper record);

    //按题目模糊搜索
    List<Testpaper> findByName(String name);

    //搜索全部
    List<Testpaper> findAll();

}