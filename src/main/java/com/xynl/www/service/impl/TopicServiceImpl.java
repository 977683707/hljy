package com.xynl.www.service.impl;

import com.xynl.www.dao.TopicMapper;
import com.xynl.www.domain.Topic;
import com.xynl.www.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TopicServiceImpl implements TopicService {
    @Autowired
    private TopicMapper topicMapper;
    @Override
    public List<Topic> findByTid(Integer tid) {
        return topicMapper.findByTid(tid) ;
    }
}
