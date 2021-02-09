package com.xynl.www.service.impl;

import com.xynl.www.dao.BlessingMapper;
import com.xynl.www.domain.Blessing;
import com.xynl.www.service.BlessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlessingServiceImpl implements BlessingService {
    @Autowired
    private BlessingMapper blessingMapper;
    @Override
    public int insert(Blessing blessing) {
        return blessingMapper.insert(blessing);
    }
}
