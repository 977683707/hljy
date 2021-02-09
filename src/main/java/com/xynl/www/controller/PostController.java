package com.xynl.www.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xynl.www.domain.Post;
import com.xynl.www.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    @RequestMapping("/post")
    public String post(Model model, Integer pageNum) {
        int a=1;
        if (pageNum != null) {
            a=pageNum;
        }
        PageHelper.startPage(a, 6);
        List<Post> postList = postService.findAll();
        PageInfo<Post> pageInfo = new PageInfo<>(postList);
        model.addAttribute("posts", pageInfo.getList());
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
        return "post";
    }

    @RequestMapping("/postDetails")
    public String postDetails(Model model, Integer id) {
        Post post = postService.findById(id);
        model.addAttribute("post", post);
        return "postDetails";
    }
}
