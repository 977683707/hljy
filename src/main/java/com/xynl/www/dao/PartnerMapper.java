package com.xynl.www.dao;

import com.xynl.www.domain.Partner;

import java.util.List;

public interface PartnerMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Partner record);

    int insertSelective(Partner record);

    Partner selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Partner record);

    int updateByPrimaryKey(Partner record);

    List<Partner> findAll();

    List<Partner> findOrderByTime();
}