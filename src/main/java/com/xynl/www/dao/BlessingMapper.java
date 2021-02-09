package com.xynl.www.dao;

import com.xynl.www.domain.Blessing;

public interface BlessingMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Blessing record);

    int insertSelective(Blessing record);

    Blessing selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Blessing record);

    int updateByPrimaryKey(Blessing record);
}