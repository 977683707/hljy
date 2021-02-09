package com.xynl.www.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xynl.www.domain.Partner;
import com.xynl.www.service.impl.PartnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/partner")
public class PartnerController {

    @Autowired
    private PartnerService partnerService;

    @RequestMapping("/partner")
    public String partner(Model model, Integer pageNum) {

        //返回所有合作伙伴
        int a=1;
        if (pageNum != null) {
            a=pageNum;
        }
        PageHelper.startPage(a, 6);
        List<Partner> partnerList = partnerService.findAll();
        PageInfo<Partner> pageInfo = new PageInfo<>(partnerList);
        model.addAttribute("partners", pageInfo.getList());
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

        //返回最近合作
        PageHelper.startPage(1, 5);
        List<Partner> partnerList1 = partnerService.findOrderByTime();
        PageInfo<Partner> pageInfo1 = new PageInfo<>(partnerList1);
        model.addAttribute("partners1", pageInfo1.getList());

        return "partner";
    }
}
