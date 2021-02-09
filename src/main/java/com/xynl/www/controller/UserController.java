package com.xynl.www.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xynl.www.domain.Parameter;
import com.xynl.www.domain.ResultInfo;
import com.xynl.www.domain.User;
import com.xynl.www.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ResultInfo resultInfo;

    //返回主页面
    @RequestMapping("/index")
    public String index(Model model) {

        //返回优质人气会员
        PageHelper.startPage(1, 10);
        List<User> userList1 = userService.findAll();
        PageInfo<User> pageInfo1 = new PageInfo<>(userList1);
        model.addAttribute("users1", pageInfo1.getList());
        //返回男会员
        PageHelper.startPage(1, 10);
        List<User> userList2 = userService.findBySex("男");
        PageInfo<User> pageInfo2 = new PageInfo<>(userList2);
        model.addAttribute("users2", pageInfo2.getList());
        //返回女会员
        PageHelper.startPage(1, 10);
        List<User> userList3 = userService.findBySex("女");
        PageInfo<User> pageInfo3 = new PageInfo<>(userList3);
        model.addAttribute("users3", pageInfo3.getList());

        return "index";
    }

    //    登录
    @RequestMapping("/login")
    public @ResponseBody
    ResultInfo login(User user, HttpServletRequest request) {
        User user1 = userService.findByPhoneAndPassword(user);
        if (user1 != null) {
            request.getSession().setAttribute("user", user1);
            resultInfo.setFlag(true);
            resultInfo.setErrorMsg(null);
        } else {
            resultInfo.setFlag(false);
            resultInfo.setErrorMsg("用户名或密码错误");
        }
        return resultInfo;
    }

    //跳转交朋识友页面
    @RequestMapping("/jpsy")
    public String jpsy(Model model) {
        //点击最多用
        PageHelper.startPage(1, 10);
        List<User> userList = userService.findAll();
        PageInfo<User> pageInfo = new PageInfo<>(userList);
        model.addAttribute("userAll", pageInfo.getList());
        return "jpsy";
    }

    //跳转注册页面
    @RequestMapping("/reg")
    public String reg() {
        return "reg";
    }

    //检查手机号是否被注册
    @RequestMapping("/checkPhone")
    public @ResponseBody
    ResultInfo checkPhone(String phone) {
        User user = userService.checkPhone(phone);
        if (user != null) {
            resultInfo.setFlag(true);
        } else {
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }

    //用户注册
    @RequestMapping("/regist")
    public String regist(User user, MultipartFile headportrait_m, MultipartFile photo_m) {
        String filename_headportrait = headportrait_m.getOriginalFilename();
        String filename_photo_m = photo_m.getOriginalFilename();
        String suffixName_headportrait = filename_headportrait.substring(filename_headportrait.lastIndexOf("."));
        String suffixName_photo_m = filename_photo_m.substring(filename_photo_m.lastIndexOf("."));
        filename_headportrait = UUID.randomUUID() + suffixName_headportrait;
        filename_photo_m = UUID.randomUUID() + suffixName_photo_m;
        user.setHeadportrait(filename_headportrait);
        user.setPhoto(filename_photo_m);
        String filePath = "F:/img/";
        int i = userService.registUser(user);
        try {
            //将图片保存到static文件夹里
            headportrait_m.transferTo(new File(filePath + filename_headportrait));
            photo_m.transferTo(new File(filePath + filename_photo_m));
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (i > 0) {
            resultInfo.setFlag(true);
            return "index";
        } else {
            return "reg";
        }
    }

    //筛选朋友
    @RequestMapping("/filter1")
    public String filter1(Model model, HttpServletRequest request, Parameter parameter, Integer pageNum) {

        //点击最多用
        PageHelper.startPage(1, 10);
        List<User> userList1 = userService.findAll();
        PageInfo<User> pageInfo1 = new PageInfo<>(userList1);
        model.addAttribute("userAll", pageInfo1.getList());
        request.getSession().setAttribute("parameter",parameter);
        PageHelper.startPage(1, 20);
        List<User> userList = userService.filterUser(parameter);
        PageInfo<User> pageInfo = new PageInfo<>(userList);
        //设置结果集
        model.addAttribute("users", pageInfo.getList());
        model.addAttribute("pageInfo", pageInfo);
        //设置总条数
        model.addAttribute("Total", pageInfo.getTotal());
        //设置总页数
        model.addAttribute("Pages", pageInfo.getPages());
        //设置当前页
        model.addAttribute("PageNum", pageInfo.getPageNum());
        //设置上一页
        if (pageInfo.getPageNum() <= 1) {
            model.addAttribute("PageNum1", pageInfo.getPageNum());
        } else {
            model.addAttribute("PageNum1", pageInfo.getPageNum() - 1);
        }
        //设置下一页
        if (pageInfo.getPageNum() < pageInfo.getPages()) {
            model.addAttribute("PageNum2", pageInfo.getPageNum() + 1);
        } else {
            model.addAttribute("PageNum2", pageInfo.getPageNum());
        }

        return "jpsy";
    }

    @RequestMapping("/filter2")
    public String filter2(Model model,HttpServletRequest request,Integer pageNum) {

        //点击最多用
        PageHelper.startPage(1, 10);
        List<User> userList1 = userService.findAll();
        PageInfo<User> pageInfo1 = new PageInfo<>(userList1);
        model.addAttribute("userAll", pageInfo1.getList());
        Parameter parameter = (Parameter) request.getSession().getAttribute("parameter");
        PageHelper.startPage(pageNum, 20);
        List<User> userList = userService.filterUser(parameter);
        PageInfo<User> pageInfo = new PageInfo<>(userList);
        //设置结果集
        model.addAttribute("users", pageInfo.getList());
        model.addAttribute("pageInfo", pageInfo);
        //设置总条数
        model.addAttribute("Total", pageInfo.getTotal());
        //设置总页数
        model.addAttribute("Pages", pageInfo.getPages());
        //设置当前页
        model.addAttribute("PageNum", pageInfo.getPageNum());
        //设置上一页
        if (pageInfo.getPageNum() <= 1) {
            model.addAttribute("PageNum1", pageInfo.getPageNum());
        } else {
            model.addAttribute("PageNum1", pageInfo.getPageNum()-1);
        }
        //设置下一页
        if (pageInfo.getPageNum() < pageInfo.getPages()) {
            model.addAttribute("PageNum2", pageInfo.getPageNum() + 1);
        } else {
            model.addAttribute("PageNum2", pageInfo.getPageNum());
        }

        return "jpsy";
    }

//    用于用户详情页的显示
    @RequestMapping("/userDetails1")
    public String userDetails1(Model model,Integer id,HttpServletRequest request) {
        //用于猜你喜欢
        PageHelper.startPage(1, 6);
        List<User> userList1 = userService.findAll();
        PageInfo<User> pageInfo1 = new PageInfo<>(userList1);
        model.addAttribute("userAll", pageInfo1.getList());
        request.getSession().setAttribute("id",id);
        if (pageInfo1.getPageNum() < pageInfo1.getPages()) {
            model.addAttribute("PageNum2", pageInfo1.getPageNum() + 1);
        } else {
            model.addAttribute("PageNum2", pageInfo1.getPageNum());
        }

        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "user";
    }
    @RequestMapping("/userDetails2")
    public String userDetails2(Model model,Integer pageNum,HttpServletRequest request) {
        //用与猜你喜欢
        PageHelper.startPage(pageNum, 6);
        List<User> userList1 = userService.findAll();
        PageInfo<User> pageInfo1 = new PageInfo<>(userList1);
        model.addAttribute("userAll", pageInfo1.getList());
        if (pageInfo1.getPageNum() < pageInfo1.getPages()) {
            model.addAttribute("PageNum2", pageInfo1.getPageNum() + 1);
        } else {
            model.addAttribute("PageNum2", pageInfo1.getPageNum());
        }

        Integer id =(Integer) request.getSession().getAttribute("id");
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "user";
    }

    //跳转关于我们页面
    @RequestMapping("/gywm")
    public String gywm() {
        return "gywm";
    }

    //退出登录
    @RequestMapping("/tcdl")
    public @ResponseBody
    ResultInfo tcdl(String a,HttpServletRequest request) {
        if (a != null) {
            request.getSession().removeAttribute("user");
            resultInfo.setFlag(true);
        } else {
            resultInfo.setFlag(false);
        }
        return resultInfo;
    }
}
