/**
 * [OEUI] (C)2010-2099 oelove.com Inc.biz
 * Email：service@phpcoo.com，phpcoo@qq.com
 * This is NOT a freeware, use is subject to license terms
 * $ Last update 2020/11/09 by Tang $
*/
/* [ 全局弹窗..for OEUI 20.11.13 ] */
$(function () {
    
    function OEGbPop() {
        this.pop_dialog = null;
        this.login_w = 480;
        this.login_h = 580;
        this.initJdLogin();
        this.initJdWxCode();
        this.clickWinInfo();
        this.clickChat();
    }
    
    OEGbPop.prototype = {
        
        //jd登录框 iframe
        initJdLogin:function() {
            var _this = this;
            $(document).on("click", "[f='pop_jdlogin']", function(){
                var width = $(this).attr("data-width");
                if (typeof (width) == "undefined") {
                    width = _this.login_w;
                }
                var height = $(this).attr("data-height");
                if (typeof (height) == "undefined") {
                    height = _this.login_h;
                }
                _this.jdLogin(width, height);
            });
            $(document).on("click", "[f='pop2_jdlogin']", function(){
                var width = $(this).attr("data-width");
                if (typeof (width) == "undefined") {
                    width = _this.login_w;
                }
                var height = $(this).attr("data-height");
                if (typeof (height) == "undefined") {
                    height = _this.login_h;
                }
                _this.jdLogin(width, height);
            });
        },
        jdLogin:function(width, height) {
            var _this = this;
            
            if (typeof (width) == "undefined") {
                width = _this.login_w;
            }
            if (typeof (height) == "undefined") {
                height = _this.login_h;
            }
                
            OEUI.modal.dialog({
                type: 'iframe',
                title: '登录',
                width: width,
                height: height,
                content: _ROOT_PATH+'index.php?c=passport&a=jdlogin'
            });
        },
        
        //弹出引导关注公众号 iframe
        initJdWxCode:function() {
            var _this = this;
            $(document).on("click", "[f='pop_jdwxcode']", function () {
                var width = $(this).attr("data-width");
                if (typeof (width) == "undefined") {
                    width = 330;
                }
                var height = $(this).attr("data-height");
                if (typeof (height) == "undefined") {
                    height = 360;
                }
                _this.jdWxcode(width, height);
            });
        },
        jdWxcode:function(width, height) {
            OEUI.modal.dialog({
                type: 'iframe',
                title: '温馨提示',
                width: width,
                height: height,
                content: _ROOT_PATH+'index.php?c=index&a=wxcode'
            });
        },
        
        //右下角消息提示
        clickWinInfo:function() {
            var _this = this;
            //关闭消息提醒
            $(document).on("click", "[f='but_close_infowin']", function () {
                _closeInfoWinData();
            });
        },
        
        //发起聊天
        clickChat:function() {
            var _this = this;
            
            $(document).on("click", "[f='pop_jdchat']", function () {
                var touid = $(this).attr("data-touid");
                if (typeof (touid) == "undefined") {
                    touid = '';
                    OEUI.message.msg({
                        text: '请指定聊天会员Uid',
                    });
                    return false;
                }
                var login_status = $(this).attr("data-loginstatus");
                if (typeof (login_status) == "undefined") {
                    login_status = "1";
                }
                if (login_status == "0") {
                    _this.jdLogin();
                    return false;
                }

                var width = $(this).attr("data-width");
                if (typeof (width) == "undefined") {
                    width = 700;
                }
                var height = $(this).attr("data-height");
                if (typeof (height) == "undefined") {
                    height = 560;
                }
                _this.getChat(touid, width, height);
            }); 
        },
        
        //请求聊天
        getChat:function(touid, width, height) {
            //获取sid...
            $.ajax({
                type: "POST",
                url: _ROOT_PATH + "index.php?m=user",
                cache: false,
                data: {
                    c: "msgchat", a: "setsid", touid: touid
                },
                dataType: "json",
                success: function (data) {
                    var response = data.response;
                    var result = data.result;
                    if (response == '1') {
                        OEUI.modal.dialog({
                            type: 'iframe',
                            title: '与['+touid+']聊天...',
                            width: width,
                            height: height,
                            content: _ROOT_PATH + "index.php?m=user&c=msgchat&sid="+result
                        });
                    }
                    else if (response == '2') {
                        
                        if (result == '2') {
                            OEUI.message.msg({
                                text: '你的资料审核不通过，无法跟会员互动'
                            });
                            return false;
                        }
                        else if (result == '3') {
                            OEUI.message.msg({
                                text: "你已被拉入黑名单，无法跟会员互动"
                            });
                            return false;
                        }
                        else if (result == '4' || result == '5') {
                            OEUI.message.msg({
                                text: "你已经关闭了征婚状态，请在个人中心开启，才能进行互动。"
                            });
                            return false;
                        }
                        else {
                            OEUI.modal.info({
                                title: '温馨提示',
                                text: '你的资料审核中，无法跟会员互动',
                                confirmText: '完善资料',
                                cancelText: '知道了',
                                confirm: function () {
                                    window.top.location.href = _ROOT_PATH + "index.php?m=user&c=profile";
                                },
                                cancel: function () {
                                    
                                }
                            });
                        }
                    }
                    else if (response == '3') {
                        OEUI.modal.info({
                            title: '温馨提示',
                            text: '你的头像未上传或审核不通过',
                            confirm: function () {
                                window.top.location.href = _ROOT_PATH + "index.php?m=user";
                            },
                            cancel: function () {
                                
                            }
                        });
                    }
                    else if (response == '4') {
                        OEUI.modal.info({
                            title: '温馨提示',
                            text: '你的手机还未认证，请先认证',
                            confirm: function () {
                                window.top.location.href = _ROOT_PATH + "index.php?m=user&c=rz";
                            },
                            cancel: function () {
                                
                            }
                        });
                        return false;
                    }
                    else {
                        //加群 
                        if (result == '20') {
                            //跳到着陆页
                            window.location.href = _ROOT_PATH + "index.php?c=qzform&a=land&uid="+touid;
                            return false;
                        }
                        else {
                            //9.04.23 其他提示
                            if (result != '') {
                                OEUI.message.msg({
                                    text: result
                                });
                            }
                            else {
                                OEUI.message.msg({
                                    text: '系统繁忙，请稍后再试"'
                                });
                            }
                        }
                    }
                },
                error: function () {

                }
            });
        },
        
        //弹出支付
        jdPay:function(paynum, width, height) {
            if (typeof(width) == 'undefined') {
                width = 570;
            }
            if (typeof(height) == 'undefined') {
                height = 590;
            }
            OEUI.modal.dialog({
                type: 'iframe',
                title: '收银台',
                width: width,
                height: height,
                content: _ROOT_PATH+'index.php?c=pay&type=popup&paynum='+paynum
            });
        }
    }
    
    window.OEPOP = new OEGbPop();
});

//获取消息提醒... 20.11.13
function _openInfoWinData() {
    if ($("#infowin_box").length > 0) {
        $.ajax({
            type: "POST",
            url: _ROOT_PATH+"index.php?m=user",
            cache: false,
            data: {
                c: "infowin"
            },
            dataType: "json",
            success: function (data) {
                var response = data.response;
                var result = data.result;
                if (response == "1") {
                    if (result != '') {
                        $("#infowin_data").html('');
                        $("#infowin_data").html(result);
                        $("#infowin_box").slideDown(300);
                        setTimeout(function () {
                            _closeInfoWinData();
                        }, INFOWIN_CLOSETIME * 1000);
                    }
                }
                setTimeout(function () {
                    _openInfoWinData();
                }, INFOWIN_LOOPTIME * 1000);
            },
            error: function () {

            }
        });
    }
}
//关闭消息窗口
function _closeInfoWinData() {
    if ($("#infowin_box").length > 0) {
        $("#infowin_box").slideUp(300);
    }
}
