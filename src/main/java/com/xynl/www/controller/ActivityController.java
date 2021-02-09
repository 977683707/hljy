package com.xynl.www.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.xynl.www.domain.Activity;
import com.xynl.www.domain.Parameter;
import com.xynl.www.domain.ResultInfo;
import com.xynl.www.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/activity")
public class ActivityController {
    @Autowired
    private ActivityService activityService;
    @Autowired
    private ResultInfo resultInfo;

//    查询所有活动带分页
    @RequestMapping("/activity1")
    public String activity1(Model model, Activity activity, HttpServletRequest request) {

        if (activity.getAddress() == null && activity.getType() == null) {
            request.getSession().setAttribute("activity",new Activity());
        }else {
            request.getSession().setAttribute("activity",activity);
        }
        PageHelper.startPage(1, 6);
        List<Activity> activityList = activityService.findByParameter(activity);
        PageInfo<Activity> pageInfo = new PageInfo<>(activityList);
//        换回数据集合
        model.addAttribute("activitys", pageInfo.getList());
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
        return "activity";
    }
    @RequestMapping("/activity2")
    public String activity2(Model model,Integer pageNum, HttpServletRequest request) {
        Activity activity1 = (Activity) request.getSession().getAttribute("activity");
        PageHelper.startPage(pageNum, 6);
        List<Activity> activityList = activityService.findByParameter(activity1);
        PageInfo<Activity> pageInfo = new PageInfo<>(activityList);
//        换回数据集合
        model.addAttribute("activitys", pageInfo.getList());
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
        return "activity";
    }
//跳转活动详情页面
    @RequestMapping("/activityDetails")
    public String activityDetails(Integer id,Model model) {
        Activity activity = activityService.findById(id);
        model.addAttribute("activity", activity);
        return "activityDetails";
    }

    //    报名功能的ajax请求
    @RequestMapping("/apply")
    public @ResponseBody
    ResultInfo apply(Parameter parameter) {
        Activity activity = activityService.findById(parameter.getI2());
        if (parameter.getS1().equals("男")) {
            if (activity.getMale() < activity.getActivitynumber() / 2) {
                activityService.updateByParameter(parameter);
                activityService.updateMaleById(parameter.getI2());
                resultInfo.setFlag(true);
                resultInfo.setErrorMsg("恭喜您，预报名成功！");
            }else {
                resultInfo.setFlag(false);
                resultInfo.setErrorMsg("对不起，预报名人数已满！");
            }
        }
        if (parameter.getS1().equals("女")) {
            if (activity.getFemale() < activity.getActivitynumber() / 2) {
                activityService.updateByParameter(parameter);
                activityService.updateFemaleById(parameter.getI2());
                resultInfo.setFlag(true);
                resultInfo.setErrorMsg("恭喜您，预报名成功！");
            }else {
                resultInfo.setFlag(false);
                resultInfo.setErrorMsg("对不起，预报名人数已满！");
            }
        }
        return resultInfo;
    }
}
