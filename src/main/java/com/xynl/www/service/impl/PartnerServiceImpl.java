package com.xynl.www.service.impl;

import com.xynl.www.dao.PartnerMapper;
import com.xynl.www.domain.Partner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartnerServiceImpl implements PartnerService {

    @Autowired
    private PartnerMapper partnerMapper;

    //查询所有
    @Override
    public List<Partner> findAll() {
        return partnerMapper.findAll();
    }

    //按时间排序
    @Override
    public List<Partner> findOrderByTime() {
        return partnerMapper.findOrderByTime();
    }
}
