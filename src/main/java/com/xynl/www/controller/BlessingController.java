package com.xynl.www.controller;

import com.xynl.www.domain.Blessing;
import com.xynl.www.domain.ResultInfo;
import com.xynl.www.domain.User;
import com.xynl.www.service.BlessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/blessing")
public class BlessingController {

    @Autowired
    private ResultInfo resultInfo;
    @Autowired
    private BlessingService blessingService;

    @RequestMapping("/insert")
    public @ResponseBody
    ResultInfo insert(Blessing blessing, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        if (user != null) {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String data = df.format(new Date());
            blessing.setTime(data);
            blessing.setUname(user.getName());
            blessing.setUphoto(user.getHeadportrait());
            int i = blessingService.insert(blessing);
            if (i > 0) {
                resultInfo.setFlag(true);
                resultInfo.setErrorMsg("祝福成功，谢谢！");
            }
        } else {
            resultInfo.setFlag(false);
            resultInfo.setErrorMsg("祝福失败,请先登录。");
        }
        return resultInfo;
    }
}
