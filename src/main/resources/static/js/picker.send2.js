/**
 * [OEUI] (C)2010-2099 oelove.com Inc.
 * Email: service@phpcoo.com，phpcoo@qq.com
 * This is not a freeware, use is subject to license terms
 * $ LastTime 2020.11.10 Update by AT $ for oepcui
*/
var _sms_cd_timer = 60; //倒计时
$(function(){
    function OEPickerSend(){
        this.sendurl = '';
        
        this.mobile_input = 'mobile'; //手机号输入框名
        this.mobile = ''; //手机号
        this.send_type = ''; //发送类型
        this.mod = 'mobile'; //发送模式
        this.checkimgcode = '0'; //是否启用防刷
        this.validcode = ''; //防刷校验码
        
        this.but_send = 'but_send_mobile_code'; //发送按钮 f
        this.but_obj_id = 'but_send_mobile_code'; //发送按钮 id

        this.picker_imgcode_box = 'picker_imgcode_box'; //防刷框
        
        this.wakeSend();
        this.wakeBrush();
    }

    OEPickerSend.prototype={
        wakeSend:function() {
            var _this = this;
            //点击发送按钮
            $(document).on("click", "[f='"+_this.but_send+"']", function(){
                var $input = $(this).attr("data-input");
                if (typeof($input) == "undefined") {
                    
                }
                else {
                    _this.mobile_input = $input;
                }
                //模块
                var $mod = $(this).attr("data-mod");
                if (typeof($mod) == "undefined") {
                    
                }
                else {
                    _this.mod = $mod;
                }
                var $val = $("#"+_this.mobile_input).val();
                if (typeof($val) == "undefined") {
                    $val = "";
                }
                if ($val == "") {
                    if (_this.mod == 'email') {
                        OEUI.message.msg({
                            text: "请填写邮箱地址"
                        });
                    }
                    else if (_this.mod == 'qq') {
                        OEUI.message.msg({
                            text: "请填写QQ号"
                        });
                    }
                    else {
                        OEUI.message.msg({
                            text: "请填写手机号"
                        });
                    }
                    
                    return;
                }
                var $type = $(this).attr("data-type"); //类型
                if (typeof($type) == "undefined") {
                    $type = "reg";
                }
                _this.send_type = $type;
                
                //是否开启防刷
                var $checkimgcode = $(this).attr("data-checkimgcode");
                if (typeof($checkimgcode) == "undefined") {
                    $checkimgcode = "0";
                }
                _this.checkimgcode = $checkimgcode;
                _this.but_obj_id = $(this).attr("id"); //保存obj_id
                _this.mobile = $val;
                
                if (_this.checkimgcode == '1') {
                    _this.showBrush(); //防刷机制
                }
                else {
                    _this.pickerSend(); //直接发送验证
                }
            });
        },
        //发送短信
        pickerSend:function() {
            var _this = this;
            
            if (!$("#"+_this.but_obj_id).hasClass("forbid_send")) { 
            
                $("#"+_this.but_obj_id).addClass("forbid_send");
                
                if (_this.mod == "email") {
                    _this.sendurl = _ROOT_PATH+"index.php?c=picker&a=sendemail";
                }
                else if (_this.mod == "qq") {
                    _this.sendurl = _ROOT_PATH+"index.php?c=picker&a=sendqq";
                }
                else {
                    _this.sendurl = _ROOT_PATH+"index.php?c=picker&a=sendmobile";
                }
                
                //兼容发送邮件 20.11.11
                var val = $("#"+_this.mobile_input).val();;

                $.ajax({
                    type: "POST",
                    url: _this.sendurl,
                    cache: false,
                    data: {
                        type:_this.send_type, mobile:_this.mobile, 
                        imgcode:_this.validcode, validcode:_this.validcode, 
                        email:val, qq:val
                    },
                    dataType: "json",
                    success: function(data) {
                        var response = data.response;
                        var result = data.result;
                        $("#"+_this.but_obj_id).removeClass("forbid_send");
                        
                        if (response == "1") {
                            if (_this.mod == 'email') {
                                OEUI.message.msg({
                                    text: "发送成功，请查收邮件！"
                                });
                            }
                            else if (_this.mod == 'qq') {
                                OEUI.message.msg({
                                    text: "发送成功，请查收邮件！"
                                });
                            }
                            else {
                                OEUI.message.msg({
                                    text: "发送成功，请查收手机短信！"
                                });
                            }
                            _this.pickerCountDown(); //倒计时
                        }
                        else {
                            if (result == '') {
                                if (_this.mod == 'email') {
                                    result = '发送失败，请检查邮箱是否可用' 
                                }
                                else if (_this.mod == 'qq') {
                                    result = '发送失败，请检查邮箱是否可用' 
                                }
                                else {
                                    result = '发送失败，请检查手机号是否可用' 
                                }
                            }
                            OEUI.message.msg({
                                text: result
                            });
                            
                            $("#"+_this.but_obj_id).html('获取验证码');
                        }
                    },
                    error: function() {
                        $("#"+_this.but_obj_id).removeClass("forbid_send");
                        $("#"+_this.but_obj_id).html('获取验证码');
                    }
                }); 
            }
        },

        //倒计时
        pickerCountDown:function() {
            var _this = this;
            var obj = $("#"+_this.but_obj_id);
            var static_class = obj.attr("data-staticclass");
            var active_class = obj.attr("data-activeclass");
            if (!static_class) {
                static_class = "color_f";
            }
            if (!active_class) {
                active_class = "color_f";
            }
            if (_sms_cd_timer == 0) {
                obj.html("获取验证码");
                obj.removeClass(active_class).addClass(static_class);
                obj.attr('f', _this.but_send);
                _sms_cd_timer = 60; 
            }
            else {
                obj.removeClass(static_class).addClass(active_class);
                obj.html(_sms_cd_timer+"秒重新发送");
                obj.attr('f', '');
                _sms_cd_timer--; 
                setTimeout(function() { 
                    _this.pickerCountDown();
                },	1000);
            }
        },
        
        //防刷机制
        wakeBrush:function() {
            var _this = this;
            //关闭防刷窗口
            $(document).on("click", "[f='but_picker_close_imgcode']", function(){
                $("#"+_this.picker_imgcode_box).hide();
            });
            
            //刷新图片校验码
            $(document).on("click", "[f='but_picker_refresh_imgcode']", function(){
                $(this).find("img").show();
                _this.pickerGetImageCode();
            });
            
            //校验选中的图片
            $(document).on("click", "[f='but_picker_sel_imgcode']", function(){
                var $validcode = $(this).attr("data-code");
                
                $(this).addClass('current').siblings().removeClass('current');
                $("#picker_imgcode_error").hide();
                $("#picker_imgcode_zhao").show();
                
                $.ajax({
                    type: "POST",
                    url: _ROOT_PATH+"index.php?c=picker&a=checkimgcode",
                    cache: false,
                    data: {
                        validcode:$validcode
                    },
                    dataType: "json",
                    success: function($data) {
                        var $json = eval($data);
                        var $response = $json.response;
                        var $result = $json.result;
                        if ($response == "1") {
                            //校验通过
                            $("#picker_imgcode_zhao").hide();
                            $("#picker_imgcode_error").hide();
                            $("#picker_imgcode_box").hide();
                            _this.validcode = $validcode; //存
                            //发送验证码
                            _this.pickerSend();
                            
                        }
                        else if ($response == "2") {
                            //校验失败  重新刷新
                            $("#picker_imgcode_zhao").show();
                            $("#picker_imgcode_error").slideDown(100, function(){
                                setTimeout(function(){
                                    $("#picker_imgcode_zhao").hide();
                                    $("[f='but_picker_refresh_imgcode']").find("img").show();
                                    _this.pickerGetImageCode();
                                    $("#picker_imgcode_error").slideUp(100);
                                }, 1000);
                            });
                        }
                        else {
                            if ($result.length == 0 || $result == '') {
                                $result = '请求异常，请检查！';
                            }
                            OEUI.message.msg({
                                text: $result
                            });
                            
                            $("#picker_imgcode_zhao").hide();
                            $("#picker_imgcode_error").hide();
                        }
                    },
                    error: function() {
                        OEUI.message.msg({
                            text: '系统繁忙，请稍后再试！'
                        });
                    }
                });
               
            });
                    
        },
        //显示
        showBrush:function() {
            var _this = this;
            $("#"+_this.picker_imgcode_box).show();
            _this.pickerGetImageCode();
        },
        //生成图片校验码
        pickerGetImageCode:function() {
            var _this = this;
            $.ajax({
                type: "POST",
                url: _ROOT_PATH+"index.php?c=picker&a=imgcode",
                cache: false,
                data: {
                },
                dataType: "json",
                success: function($data) {
                    var $json = eval($data);
                    var $response = $json.response;
                    var $result = $json.result;
                    var $wzpic = $json.wzpic;
                    if (typeof($wzpic) == "undefined") {
                        $wzpic = "";
                    }
                    if ($response == "1") {
                        if ($wzpic == "") {
                            OEUI.message.msg({
                                text: '点击/刷新过于频繁！'
                            });
                        }
                        else {
                            $("#wzpic_title").find("img").attr("src", $wzpic);
                            $("#picker_imgcode_data").html($result);
                        }
                    }
                    else {
                        if ($result.length == 0 || $result == '') {
                            $result = '请求异常，请检查！';
                        }
                        OEUI.message.msg({
                            text: $result
                        });
                    }
                    
                    $("[f='but_picker_refresh_imgcode']").find("img").hide();
                },
                error: function() {
                    OEUI.message.msg({
                        text: '系统繁忙，请稍后再试！'
                    });
                    $("[f='but_picker_refresh_imgcode']").find("img").hide();
                }
            });
    
        }
    }

    new OEPickerSend();
    
})





