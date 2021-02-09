package com.xynl.www.service.impl;

import com.xynl.www.domain.Partner;

import java.util.List;

public interface PartnerService {

    //查询所有
    List<Partner> findAll();

    //按时间排序
    List<Partner> findOrderByTime();
}
