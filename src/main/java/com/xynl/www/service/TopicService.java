package com.xynl.www.service;

import com.xynl.www.domain.Topic;

import java.util.List;

public interface TopicService {
    //按照tid查询
    List<Topic> findByTid(Integer tid);
}
