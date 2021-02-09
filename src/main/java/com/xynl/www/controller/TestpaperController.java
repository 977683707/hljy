package com.xynl.www.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xynl.www.domain.Parameter;
import com.xynl.www.domain.ResultInfo;
import com.xynl.www.domain.Testpaper;
import com.xynl.www.domain.Topic;
import com.xynl.www.service.TestpaperService;
import com.xynl.www.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/test")
public class TestpaperController {
    @Autowired
    private TestpaperService testpaperService;
    @Autowired
    private TopicService topicService;
    @Autowired
    private ResultInfo resultInfo;

    @RequestMapping("/testpaper1")
    public String testpaper1(String name, Model model, HttpServletRequest request) {
        if (name == null) {
            request.getSession().setAttribute("name", null);
            PageHelper.startPage(1, 6);
            List<Testpaper> testpaperList = testpaperService.findAll();
            PageInfo<Testpaper> pageInfo = new PageInfo<>(testpaperList);
            model.addAttribute("testpapers", pageInfo.getList());
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
            model.addAttribute("total", pageInfo.getTotal());
//        返回总页数
            model.addAttribute("pages", pageInfo.getPages());
//        返回当前页
            model.addAttribute("pageNum", pageInfo.getPageNum());
        } else {
            request.getSession().setAttribute("name", name);
            PageHelper.startPage(1, 6);
            List<Testpaper> testpaperList = testpaperService.findByName(name);
            PageInfo<Testpaper> pageInfo = new PageInfo<>(testpaperList);
            model.addAttribute("testpapers", pageInfo.getList());
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
            model.addAttribute("total", pageInfo.getTotal());
//        返回总页数
            model.addAttribute("pages", pageInfo.getPages());
//        返回当前页
            model.addAttribute("pageNum", pageInfo.getPageNum());
        }

        return "test";
    }

    @RequestMapping("/testpaper2")
    public String testpaper2(HttpServletRequest request, Model model, Integer pageNum) {
        String name = (String) request.getSession().getAttribute("name");
        if (name == null) {
            PageHelper.startPage(pageNum, 6);
            List<Testpaper> testpaperList = testpaperService.findAll();
            PageInfo<Testpaper> pageInfo = new PageInfo<>(testpaperList);
            model.addAttribute("testpapers", pageInfo.getList());
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
            model.addAttribute("total", pageInfo.getTotal());
//        返回总页数
            model.addAttribute("pages", pageInfo.getPages());
//        返回当前页
            model.addAttribute("pageNum", pageInfo.getPageNum());
        } else {
            PageHelper.startPage(1, 6);
            List<Testpaper> testpaperList = testpaperService.findByName(name);
            PageInfo<Testpaper> pageInfo = new PageInfo<>(testpaperList);
            model.addAttribute("testpapers", pageInfo.getList());
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
            model.addAttribute("total", pageInfo.getTotal());
//        返回总页数
            model.addAttribute("pages", pageInfo.getPages());
//        返回当前页
            model.addAttribute("pageNum", pageInfo.getPageNum());
        }
        return "test";
    }

    @RequestMapping("/testDetails1")
    public String testDetails1(Model model, Integer id,HttpServletRequest request) {
        Testpaper testpaper = testpaperService.findById(id);
        request.getSession().setAttribute("testpaper",testpaper);
        List<Topic> topicList = topicService.findByTid(id);
        model.addAttribute("topics", topicList);
        return "testDetails";
    }
    @RequestMapping("/testDetails2")
    public @ResponseBody
    ResultInfo testDetails2(Parameter parameter,HttpServletRequest request) {
        Testpaper testpaper = (Testpaper) request.getSession().getAttribute("testpaper");
        int num=parameter.getI1()+parameter.getI2()+parameter.getI3()+parameter.getI4()+
                parameter.getI5()+parameter.getI6()+parameter.getI7()+parameter.getI8()+
                parameter.getI9()+parameter.getI10()+parameter.getI11()+parameter.getI12();
        if (num < 15) {
            resultInfo.setErrorMsg(testpaper.getA1());
            resultInfo.setData(testpaper.getA2());
        }else {
            if (num < 18) {
                resultInfo.setErrorMsg(testpaper.getB1());
                resultInfo.setData(testpaper.getB2());
            } else {
                if (num < 21) {
                    resultInfo.setErrorMsg(testpaper.getC1());
                    resultInfo.setData(testpaper.getC2());
                } else {
                    resultInfo.setErrorMsg(testpaper.getD1());
                    resultInfo.setData(testpaper.getD2());
                }
            }
        }
        return resultInfo;
    }

}
