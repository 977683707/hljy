package com.xynl.www.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xynl.www.domain.Story;
import com.xynl.www.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/story")
public class StoryController {

    @Autowired
    private StoryService storyService;

    //成功故事主页面
    @RequestMapping("/story")
    public String story(Model model, Integer pageNum) {
        int a=1;
        if (pageNum != null) {
            a=pageNum;
        }
        PageHelper.startPage(a, 8);
        List<Story> storyList = storyService.findAll();
        PageInfo<Story> pageInfo = new PageInfo<>(storyList);
        model.addAttribute("storys", pageInfo.getList());
        //        返回下一页数
        if (pageInfo.getPageNum() < pageInfo.getPages()) {
            model.addAttribute("pageNum1", pageInfo.getPageNum() + 1);
        } else {
            model.addAttribute("pageNum1", pageInfo.getPageNum());
        }
//        返回上一页数
        if (pageInfo.getPageNum() > 1) {
            model.addAttribute("pageNum2", pageInfo.getPageNum() - 1);
        } else {
            model.addAttribute("pageNum2", pageInfo.getPageNum());
        }
//        返回总条数
        model.addAttribute("total",pageInfo.getTotal());
//        返回总页数
        model.addAttribute("pages", pageInfo.getPages());
//        返回当前页
        model.addAttribute("pageNum", pageInfo.getPageNum());
        return "cggs";
    }

    //成功故事详情页面
    @RequestMapping("/storyDetails1")
    public String storyDetails1(Integer id, Model model, HttpServletRequest request) {
        request.getSession().setAttribute("id", id);
        Story story = storyService.findById(id);
        model.addAttribute("story", story);

        PageHelper.startPage(1,7);
        List<Story> storyList = storyService.findBytitme();
        PageInfo<Story> pageInfo = new PageInfo<>(storyList);
        model.addAttribute("storys", pageInfo.getList());

        return "storyDetails";
    }
}
