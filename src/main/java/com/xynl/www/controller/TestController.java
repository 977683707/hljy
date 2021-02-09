package com.xynl.www.controller;

import com.xynl.www.domain.Parameter;
import com.xynl.www.domain.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.UUID;

@Controller
public class TestController {
    @RequestMapping("/test")
    public String test() {
        return "test";
    }

    @RequestMapping("/upload")
    public void upload(MultipartFile fileUpload, User user) {
        System.out.printf(user.toString());
        //获取文件名
        String fileName = fileUpload.getOriginalFilename();
        //获取文件后缀名
        String suffixName = fileName.substring(fileName.lastIndexOf("."));
        //重新生成文件名
        fileName = UUID.randomUUID() + suffixName;
        //指定本地文件夹存储图片
        String filePath = "F:/img/";
        try {
            //将图片保存到static文件夹里
            fileUpload.transferTo(new File(filePath + fileName));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/test2")
    public String test2() {
        return "testDetails";
    }

    @RequestMapping("/user")
    public String user() {
        return "user";
    }

    @RequestMapping("/test3")
    public @ResponseBody
    String session(HttpServletRequest request) {
        Parameter parameter = (Parameter)request.getSession().getAttribute("parameter");
        return parameter.toString();
    }

    @RequestMapping("/activity")
    public String activity() {
        return "activity";
    }

    @RequestMapping("/post")
    public String post() {
        return "post";
    }

    @RequestMapping("/testDetails")
    public String testDetails() {
        return "testDetails";
    }

    @RequestMapping("/cggs")
    public String cggs() {
        return "cggs";
    }

    @RequestMapping("/storyDetails")
    public String storyDetails() {
        return "storyDetails";
    }
    @RequestMapping("/partner")
    public String partner() {
        return "partner";
    }

    @RequestMapping("/gywm")
    public String gymn() {
        return "gywm";
    }
}
