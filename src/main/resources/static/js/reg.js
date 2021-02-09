/**
 * [OElove] (C)2010-2099 oelove.com biz
 * Email: service@phpcoo.com，phpcoo@qq.com
 * $ LastTime 2020.11.23 Update by CL $
*/

$(function(){
    function OEReg(){
        
        this.obj_id = '';
        this.clickWxLogin();
        this.checkMobile();
        this.checkEmail();
        this.checkWeixin();
        this.checkQQ();
        this.checkUserName();
        this.checkPwd();
        this.checkMobileCode();
        
        this.clickSubmit();
    }
    
    

    OEReg.prototype = {
        
        //弹出微信登录
        clickWxLogin:function() {
            var _this = this;
            
            $(document).on("click", "[f='but_open_wxlogin']", function(){
                var width = $(this).attr("data-width");
                if (typeof(width) == "undefined") {
                    width = 400;
                }
                var height = $(this).attr("data-height");
                if (typeof(height) == "undefined") {
                    height = 400;
                }
                OEUI.modal.dialog({
                    type: 'iframe',
                    title: '微信登录',
                    width: width,
                    height: height,
                    content: _ROOT_PATH+"index.php?c=passport&a=wxcode"
                });
            });
        },
        
        //验证手机号
        checkMobile:function() {
            var _this = this;
            
            $(document).on("blur", "#mobile", function(){
                var obj = $(this);
                var val = $(this).val();
                if (val != '') {
                    $.ajax({
                        type: "POST",
                        url: _ROOT_PATH+"index.php?c=picker",
                        cache: false,
                        data: {
                            a:"check", check_type:"mobile", name:val
                        },
                        dataType: "json",
                        success: function(data) {
                            var response = data.response;
                            var result = data.result;
                            if (response == "1") { //可用
                                obj.siblings('.pass').show();
                            }
                            else {
                                obj.siblings('.pass').hide();
                                if (result == '' || result == null) {
                                    result = '该手机号已被注册，请填写另外一个';
                                }
                                OEUI.message.msg({
                                    text: result
                                });
                            }
                        },
                        error: function() {
                            obj.siblings('.pass').hide();
                        }
                    }); 
                }
            });
            $(document).on('focus', '#mobile', function() {
                $(this).siblings('.pass').hide();
            });
        },
        
        //验证邮箱
        checkEmail:function() {
            var _this = this;
            
            $(document).on("blur", "#email", function(){
                var obj = $(this);
                var val = $(this).val();
                if (val != '') {
                    $.ajax({
                        type: "POST",
                        url: _ROOT_PATH+"index.php?c=picker",
                        cache: false,
                        data: {
                            a:"check", check_type:"email", name:val
                        },
                        dataType: "json",
                        success: function(data) {
                            var response = data.response;
                            var result = data.result;
                            if (response == "1") { //可用
                                obj.siblings('.pass').show();
                            }
                            else {
                                obj.siblings('.pass').hide();
                                if (result == '' || result == null) {
                                    result = '该邮箱已被注册，请填写另外一个';
                                }
                                OEUI.message.msg({
                                    text: result
                                });
                            }
                        },
                        error: function() {
                            obj.siblings('.pass').hide();
                        }
                    }); 
                }
            });
            $(document).on("focus", "#email", function(){
                $(this).siblings('.pass').hide();
            });
        },
        
        //验证微信
        checkWeixin:function() {
            var _this = this;
            
            $(document).on("blur", "#weixin", function(){
                var obj = $(this);
                var val = $(this).val();
                if (val != '') {
                    $.ajax({
                        type: "POST",
                        url: _ROOT_PATH+"index.php?c=picker",
                        cache: false,
                        data: {
                            a:"check", check_type:"weixin", name:val
                        },
                        dataType: "json",
                        success: function(data) {
                            var response = data.response;
                            var result = data.result;
                            if (response == "1") { //可用
                                obj.siblings('.pass').show();
                            }
                            else {
                                obj.siblings('.pass').hide();
                                if (result == '' || result == null) {
                                    result = '该微信号已被注册，请填写另外一个';
                                }
                                OEUI.message.msg({
                                    text: result
                                });
                            }
                        },
                        error: function() {
                            obj.siblings('.pass').hide();
                        }
                    }); 
                }
            });
            $(document).on("focus", "#weixin", function(){
                $(this).siblings('.pass').hide();
            });
        },
        
        //验证QQ
        checkQQ:function() {
            var _this = this;
            
            $(document).on("blur", "#qq", function(){
                var obj = $(this);
                var val = $(this).val();
                if (val != '') {
                    $.ajax({
                        type: "POST",
                        url: _ROOT_PATH+"index.php?c=picker",
                        cache: false,
                        data: {
                            a:"check", check_type:"qq", name:val
                        },
                        dataType: "json",
                        success: function(data) {
                            var response = data.response;
                            var result = data.result;
                            if (response == "1") { //可用
                                obj.siblings('.pass').show();
                            }
                            else {
                                obj.siblings('.pass').hide();
                                if (result == '' || result == null) {
                                    result = '该QQ号已被注册，请填写另外一个';
                                }
                                OEUI.message.msg({
                                    text: result
                                });
                            }
                        },
                        error: function() {
                            obj.siblings('.pass').hide();
                        }
                    }); 
                }
            });
            $(document).on("focus", "#qq", function(){
                $(this).siblings('.pass').hide();
            });
        },
        
        //校验用户名
        checkUserName:function() {
            var _this = this;
            
            $(document).on("blur", "#username", function(){
                var obj = $(this);
                var val = $(this).val();
                
                if (val != '') {
                    $.ajax({
                        type: "POST",
                        url: _ROOT_PATH+"index.php?c=picker",
                        cache: false,
                        data: {
                            a:"check", check_type:"username", name:val
                        },
                        dataType: "json",
                        success: function(data) {
                            var response = data.response;
                            var result = data.result;
                            if (response == "1") { //可用
                                if ($("#randname_box").css("display") == "block") {
                                    $("#randname_box").hide();
                                }
                                obj.siblings('.pass').show();
                            }
                            else {
                                obj.siblings('.pass').hide();
                                
                                if (result != '') {
                                    OEUI.message.msg({
                                        text: result
                                    });
                                }
                                else {
                                    OEUI.message.msg({
                                        text: '该用户名已被注册！'
                                    });
                                    _this.getUserName(val);
                                }
                            }
                        },
                        error: function() {
                            obj.siblings('.pass').hide();
                        }
                    }); 
                }
            });
            $(document).on("focus", "#username", function(){
                $(this).siblings('.pass').hide();
            });  
            
            
            //切换随机的用户名
            $('[f="close_name_tip"]').on('click', function() {
                $(this).closest('.oe_name_tip').hide();
            });
            $(document).on('click', '[f="select_name"]', function() {
                var name = $(this).attr('data-name');
                $(this).closest('.oe_name_tip').hide();
                $('#username').val(name).blur();
            });
            $('#username').on('focus', function() {
                $('.oe_name_tip').hide();
            });
        },
        //随机获取用户名
        getUserName:function(name) {
            var _this = this;
            $.ajax({
                type: "POST",
                url: _ROOT_PATH+"index.php?&c=passport",
                cache: false,
                data: {
                    a:"rndname", name:name
                },
                dataType: "json",
                success: function(data) {
                    var response = data.response;
                    var result = data.result;
                    if (response == "1") { //可用
                        $('#name_tip').html(result).closest('.oe_name_tip').show();
                    }
                },
                error: function() {
                    
                }
            }); 
        },
        
        //校验密码
        checkPwd:function() {
            var _this = this;
            
            $(document).on("blur", "#password", function(){
                var val = $(this).val();
                if (val != '') {
                    if (val.length < 6 || val.length > 16) {
                        OEUI.message.msg({
                            text: '请填写6-16个字符的密码'
                        });
                        return false;
                    }
                    if (PASSWORD_NUMBER == 1) { //含数字
                        if (!_hasNumber(val)) {
                            OEUI.message.msg({
                                text: '密码必须含有数字'
                            });
                            return false;
                        }
                    }
                    if (PASSWORD_SMALLCHAR == 1) { //含小写字母
                        if (!_hasSmallChar($val)) {
                            OEUI.message.msg({
                                text: '密码必须含有小写字母'
                            });
                            return false;
                        }
                    }
                    if (PASSWORD_BIGCHAR == 1) { //含大写字母
                        if (!_hasBigChar($val)) {
                            OEUI.message.msg({
                                text: '密码必须含有大写字母'
                            });
                            return false;
                        }
                    }            
                }
                else {
                    
                }
                if (val != '') {
                    $(this).siblings('.pass').show();
                }
            });
            $(document).on("focus", "#password", function(){
                $(this).siblings('.pass').hide();
            });
        },
        
        //验证手机验证码
        checkMobileCode:function() {
            var _this = this;
            
            $(document).on('input', '#mobilecode', function() {
                $(this).val($(this).val().replace(/[^0-9]/g,''));
            });
            
            $(document).on("blur", "#mobilecode", function(){
                
                var mobile = $("#mobile").val();
                var val = $(this).val();
                if (mobile != '' && val != '') {
                    $.ajax({
                        type: "POST",
                        url: _ROOT_PATH+"index.php?c=picker",
                        cache: false,
                        data: {
                            a:"check", check_type:"mobilecode", name:mobile, checkcode:val
                        },
                        dataType: "json",
                        success: function(data) {
                            var response = data.response;
                            var result = data.result;
                            if (response == "1") { //可用
                                //obj.siblings('.pass').show();
                            }
                            else {
                                //obj.siblings('.pass').hide();
                                if (result == '' || result == null) {
                                    result = '手机验证码错误';
                                }
                                OEUI.message.msg({
                                    text: result
                                });
                            }
                        },
                        error: function() {
                            //obj.siblings('.pass').hide();
                        }
                    }); 
                }
            }); 
        },
        
        //提交注册
        clickSubmit:function() {
            var _this = this;
            
            //选择父母帮征婚 
            $(document).on("click", "[f='but_select_maytype']", function(){
                var val = $(this).attr("data-val");
                $("#maytype").val(val);
                
                $("[f='but_select_maytype']").removeClass('bg_main bo_main color_f');
                $("[f='but_select_maytype']").addClass('bo_eb');
                $(this).removeClass('bo_eb').addClass('bg_main color_f bo_main');
            });
            //阅读协议...
            $(document).on("click", "[f='but_read_xieyi']", function(){
                OEUI.modal.dialog({
                    type: 'iframe',
                    title: '注册协议',
                    width: '800',
                    height: '500',
                    content: _ROOT_PATH+'index.php?c=passport&a=clause'
                });
            });
            
            //提交注册
            $(document).on("click", "[f='but_submit_reg']", function() {
                _this.obj_id = $(this).attr('id');
                

                var au_mod = $("#au_mod").val();
                if (typeof(au_mod) == "undefined") {
                    au_mod = "";
                }
                var openid = $("#openid").val();
                if (typeof(openid) == "undefined") {
                    openid = "";
                }
                var au_unionid = $("#au_unionid").val();
                if (typeof(au_unionid) == "undefined") {
                    au_unionid = "";
                }
                var au_headimgurl = $("#au_headimgurl").val();
                if (typeof(au_headimgurl) == "undefined") {
                    au_headimgurl = "";
                }
                
                
                var maytype = $("#maytype").val();
                if (typeof(maytype) == "undefined") {
                    maytype = 0;
                }
                
                var mobilecode = '';
                var mobile = $("#mobile").val();
                if (typeof(mobile) == "undefined") {
                    mobile = "";
                }
                else {
                    if (mobile == '') {
                        OEUI.message.msg({
                            text: '请填写手机号码'
                        });
                        return false;
                    }
                    mobilecode = $("#mobilecode").val();
                    if (typeof(mobilecode) == "undefined") {
                        mobilecode = "";
                    }
                    else {
                        if (mobilecode == '') {
                            OEUI.message.msg({
                                text: '请填写手机验证码'
                            });
                            return false;
                        }
                    }
                }
                
                var username = $("#username").val();
                if (username == '') {
                    OEUI.message.msg({
                        text: '请填写用户名'
                    });
                    return false;
                }
                
                var password = $("#password").val();
                if (password.length < 6 || password.length > 16) {
                    OEUI.message.msg({
                        text: '请填写6-16个字符的密码'
                    });
                    return false;
                }
                if (PASSWORD_NUMBER == 1) { //含数字
                    if (!_hasNumber(password)) {
                        OEUI.message.msg({
                            text: '密码必须含有数字'
                        });
                        return false;
                    }
                }
                if (PASSWORD_SMALLCHAR == 1) { //含小写字母
                    if (!_hasSmallChar(password)) {
                        OEUI.message.msg({
                            text: '密码必须含有小写字母'
                        });
                        return false;
                    }
                }
                if (PASSWORD_BIGCHAR == 1) { //含大写字母
                    if (!_hasBigChar(password)) {
                        OEUI.message.msg({
                            text: '密码必须含有大写字母'
                        });
                        return false;
                    }
                }
                
                var email = $("#email").val();
                if (typeof(email) == "undefined") {
                    email = "";
                }
                else {
                    if (email == '') {
                        OEUI.message.msg({
                            text: '请填写邮箱地址'
                        });
                        return false;
                    }
                }
                       
                
                var hidemobile = $("input[name='hidemobile']:checked").val();
                if (typeof(hidemobile) == "undefined") {
                    hidemobile = 0;
                }
                
                var gender = $("input[name='gender']:checked").val();
                if (typeof(gender) == "undefined") {
                    gender = "";
                }
                if (gender == '' || gender == '0') {
                    OEUI.message.msg({
                        text: '请选择性别'
                    });
                    return false;
                }
                
                var ageyear = $("#ageyear").val();
                var agemonth = $("#agemonth").val();
                var ageday = $("#ageday").val();
                if (ageyear == '' || ageyear == '0') {
                    OEUI.message.msg({
                        text: '请设置生日'
                    });
                    return false;
                }
                if (agemonth == '' || agemonth == '0') {
                    OEUI.message.msg({
                        text: '请设置生日'
                    });
                    return false;
                }
                if (ageday == '' || ageday == '0') {
                    OEUI.message.msg({
                        text: '请设置生日'
                    });
                    return false;
                }
                
                
                var dist1 = $("#dist1").val();
                var dist2 = $("#dist2").val();
                if (typeof(dist2) == "undefined") {
                    dist2 = 0;
                }
                var dist3 = $("#dist3").val();
                if (typeof(dist3) == "undefined") {
                    dist3 = 0;
                }
                if (dist1 == '' || dist1 == '0') {
                    OEUI.message.msg({
                        text: '请选择所在地'
                    });
                    return false;
                }
                if (dist2 == '' || dist2 == '0') {
                    OEUI.message.msg({
                        text: '请选择所在地'
                    });
                    return false;
                }
                
                var home1 = home2 = home3 = ''; 
                var home1 = $("#home1").val();
                if (typeof(home1) == "undefined") {
                    home1 = '';
                }
                else {
                    if (home1 == '' || home1 == '0') {
                        OEUI.message.msg({
                            text: '请选择户籍地'
                        });
                        return false;
                    }
                    
                    home2 = $("#home2").val();
                    if (typeof(home2) == "undefined") {
                        home2 = "";
                    }
                    home3 = $("#home3").val();
                    if (typeof(home3) == "undefined") {
                        home3 = "";
                    }
                }
                
                var sort = $("#sort").val();
                if (typeof(sort) == "undefined") {
                    sort = "";
                }
                else {
                    if (sort == '' || sort == '0') {
                        OEUI.message.msg({
                            text: '请选择注册类型'
                        });
                        return false;
                    }
                }
                
                var marry = $("#marry").val();
                if (typeof(marry) == "undefined") {
                    marry = "";
                }
                else {
                    if (marry == '' || marry == '0') {
                        OEUI.message.msg({
                            text: '请选择婚况'
                        });
                        return false;
                    }
                }
                
                var height = $("#height").val();
                if (typeof(height) == "undefined") {
                    height = 0;
                }
                else {
                    if (height == '' || height == '0') {
                        OEUI.message.msg({
                            text: '请选择身高'
                        });
                        return false;
                    }
                }
                
                var weight = $("#weight").val();
                if (typeof(weight) == "undefined") {
                    weight = 0;
                }
                else {
                    if (weight == '' || weight == '0') {
                        OEUI.message.msg({
                            text: '请选择体重'
                        });
                        return false;
                    }
                }
                
                var education = $("#education").val();
                if (typeof(education) == "undefined") {
                    education = 0;
                }
                else {
                    if (education == '' || education == '0') {
                        OEUI.message.msg({
                            text: '请选择学历'
                        });
                        return false;
                    }
                }
                
                var job = $("#job").val();
                if (typeof(job) == "undefined") {
                    job = 0;
                }
                else {
                    if (job == '' || job == '0') {
                        OEUI.message.msg({
                            text: '请选择职业'
                        });
                        return false;
                    }
                }
                
                var salary = $("#salary").val();
                if (typeof(salary) == "undefined") {
                    salary = 0;
                }
                else {
                    if (salary == '' || salary == '0') {
                        OEUI.message.msg({
                            text: '请选择年收入'
                        });
                        return false;
                    }
                }
                
                var house = $("#house").val();
                if (typeof(house) == "undefined") {
                    house = 0;
                }
                else {
                    if (house == '' || house == '0') {
                        OEUI.message.msg({
                            text: '请选择购房情况'
                        });
                        return false;
                    }
                }
                
                var car = $("#car").val();
                if (typeof(car) == "undefined") {
                    car = 0;
                }
                else {
                    if (car == '' || car == '0') {
                        OEUI.message.msg({
                            text: '请选择购车情况'
                        });
                        return false;
                    }
                }
                
                var scharea1 = $("#scharea1").val();
                if (typeof(scharea1) == "undefined") {
                    scharea1 = 0;
                }
                var schid = $("#schid").val();
                if (typeof(schid) == "undefined") {
                    schid = 0;
                }
                else {
                    if (schid == '' || schid == '0') {
                        OEUI.message.msg({
                            text: '请选择毕业院校'
                        });
                        return false;
                    }
                }
                
                var truename = $("#truename").val();
                if (typeof(truename) == "undefined") {
                    truename = "";
                }
                else {
                    if (truename == '') {
                        OEUI.message.msg({
                            text: '请填写真实姓名'
                        });
                        return false;
                    }
                }
                
                var weixin = $("#weixin").val();
                if (typeof(weixin) == "undefined") {
                    weixin = "";
                }
                else {
                    if (weixin == '') {
                        OEUI.message.msg({
                            text: '请填写微信号'
                        });
                        return false;
                    }
                }
                
                var qq = $("#qq").val();
                if (typeof(qq) == "undefined") {
                    qq = "";
                }
                else {
                    if (qq == '') {
                        OEUI.message.msg({
                            text: '请填写QQ号'
                        });
                        return false;
                    }
                }
                
                var agree = $("input[name='agree']:checked").val();
                if (typeof(agree) == "undefined") {
                    agree = "";
                }
                if (agree != "1") {
                    OEUI.message.msg({
                        text: '请勾选同意会员注册协议'
                    });
                    return false;
                }
                
                var send_data = {
                    'a':'regpost', 'maytype':maytype, 'mobile':mobile, 'mobilecode':mobilecode, 
                    'username':username, 'password':password, 'email':email, 
                    'hidemobile':hidemobile, 'gender':gender, 'ageyear':ageyear, 
                    'agemonth':agemonth, 'ageday':ageday, 'dist1':dist1, 
                    'dist2':dist2, 'dist3':dist3, 'home1':home1, 'home2':home2, 
                    'home3':home3, 'sort':sort, 'marry':marry, 'height':height, 
                    'weight':weight, 'education':education, 'job':job, 
                    'salary':salary, 'car':car, 'house':house, 'scharea1':scharea1, 
                    'schid':schid, 'truename':truename, 'weixin':weixin, 'qq':qq,
                    
                    'au_mod':au_mod, 'openid':openid, 'au_unionid':au_unionid, 
                    'au_headimgurl':au_headimgurl
                }
                _this.sendReg(send_data);
            });
        },
        
        //发送注册
        sendReg:function(send_data) {
            var _this = this;
            
            if (!$("#"+_this.obj_id).hasClass("forbid_submit")) {
                $("#"+_this.obj_id).addClass("forbid_submit");
                var loading = OEUI.loading({
                    el: '#'+_this.obj_id,
                    width: 30,
                    height: 30
                });
                loading.show();
            
                $.ajax({
                    type: "POST",
                    url: _ROOT_PATH + "index.php?c=passport",
                    cache: false,
                    data: send_data,
                    dataType: "json",
                    success: function(data) {
                        var response = data.response;
                        var result = data.result;
                        if (response == '1') { //成功，返回页面
                            var forward = $("#forward").val();
                            if (typeof(forward) == "undefined") {
                                forward = "";
                            }
                            window.location.href = _ROOT_PATH+"index.php?c=passport&from=reg&a=headimg&forward="+encodeURIComponent(forward);
                        }
                        else if (response == '2') { //整合OEmarry
                            window.top.location.href = result;
                        }
                        else {
                            if (result == '' || result == null) {
                                result = '注册失败，请检查会员资料！';
                            }
                            OEUI.message.msg({
                                text: result
                            });
                            $("#"+_this.obj_id).removeClass("forbid_submit");
                            loading.remove();
                        }
                    },
                    error: function() {
                        OEUI.message.msg({
                            text: '系统繁忙，请稍后再试！'
                        });
                        $("#"+_this.obj_id).removeClass("forbid_submit");
                        loading.remove();
                    }
                });
            
            }
        }
        
    }

    new OEReg();
});


//验证是否含有数字 
function _hasNumber(val) {
	var bool = false;
	var Letters = "1234567890";
	for (var i=0;i<val.length;i++) {
		var c = val.charAt(i);
		if (Letters.indexOf(c) != -1) {
			bool = true;
			break;
		}
	}
	return bool;
}
//验证是否含有小写字母 
function _hasSmallChar(val) {
	var bool = false;
	var Letters = "abcdefghijklnmopqrstuvwxyz";
	for(var i=0;i<val.length;i++) {
		var c = val.charAt(i);
		if (Letters.indexOf(c) != -1) {
			bool = true;
			break;
		}
	}
	return bool;
}
//验证码是否含有大写字母 
function _hasBigChar(val) {
	var bool = false;
	var Letters = "ABCDEFGHIJKLNMOPQRSTUVWXYZ";
	for(var i=0;i<val.length;i++) {
		var c = val.charAt(i);
		if (Letters.indexOf(c) != -1) {
			bool = true;
			break;
		}
	}
	return bool;
}

