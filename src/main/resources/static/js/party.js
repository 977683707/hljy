/**
 * [OEUI] (C)2010-2099 oelove.com Inc.biz
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * $ Last update 2020/11/20 by CL $
*/
$(function(){
    
    function OEParty() {
        this.obj_id = '';
        this.bm_dialog = null;
        this.user_dialog = null;
        this.id = '';
        
        this.clickSearch();
        this.clickBm();
        this.clickBmUser();
        
    }
    
    OEParty.prototype = {
        
        //搜索
        clickSearch:function() {
            
            $(document).on("click", "[f='but_submit_search']", function(){
                $("#search_form").submit();
            });
            
            //选择分类
            $(document).on("click", "[f='but_sel_cat']", function(){
                var val = $(this).attr("data-val");
                $("#s_catid").val(val);
                setTimeout(function(){
                    $("#search_form").submit();
                }, 100);
            });
        },
        
        //点击报名
        clickBm:function() {
            var _this = this;
            
            $(document).on('click', '[f="pop_partybm"]', function(){
                var id = $(this).attr("data-id");
                _this.id = id;
                
                var width = $(this).attr("data-width");
                if (typeof(width) == "undefined") {
                    width = 800;
                }
                var height = $(this).attr("data-height");
                if (typeof(height) == "undefined") {
                    height = 580;
                }
                
                var type = $(this).attr('data-type');
                if (type == 'login') {
                    OEPOP.jdLogin();
                    return false;
                }
                else if (type == 'idrz') {
                    _this.tipsIdrz();
                    return false;
                }
                else if (type == 'vip') {
                    _this.tipsVip();
                    return false;
                }
                _this.bm_dialog = OEUI.modal.dialog({
                    type: 'iframe',
                    title: '报名活动',
                    width: width,
                    height: height,
                    content: _ROOT_PATH+"index.php?c=party&a=bm&partyid="+id
                });
            }); 
        },
        
        tipsIdrz:function() {
            var _this = this;
            var back_url = _ROOT_PATH+"index.php?c=party&a=detail&id="+_this.id;
            OEUI.modal.warning({
                title: '温馨提示',
                text: '你还没实名认证，无法报名活动',
                confirmText: '立即认证',
                cancelText: '知道了',
                confirm: function () {
                    window.location.href = _ROOT_PATH+"index.php?m=user&c=rz&fromurl="+encodeURIComponent(back_url);
                },
                cancel: function () {
                    
                }
            });
        },
        tipsVip:function() {
            var _this = this;
            var back_url = _ROOT_PATH+"index.php?c=party&a=detail&id="+_this.id;
            OEUI.modal.warning({
                title: '温馨提示',
                text: '你不是VIP会员，无法报名活动',
                confirmText: '立即升级',
                cancelText: '知道了',
                confirm: function () {
                    window.location.href = _ROOT_PATH+"index.php?m=user&c=vip&fromurl="+encodeURIComponent(back_url);
                },
                cancel: function () {
                    
                }
            });
            
        },
        
        //报名会员
        clickBmUser:function() {
            var _this = this;
            
            //查看
            $(document).on("click", "[f='but_view_bmuser']", function(){
                var id = $("#partyid").val();
                $.ajax({
                    type: "GET",
                    url:  _ROOT_PATH+'index.php?c=party',
                    cache: false,
                    data: {
                        a:'bmuser', partyid:id
                    },
                    dataType: "json",
                    success: function (data) {
                        var result = data.result;
                        var response = data.response;
                        if (response == '1') {
                            $("#page").val(1);
                            _this.getBmPageList();
                        }
                        else{
                            if (result == '' || result == null) {
                                result = '查看失败，请检查是否已报名'
                            }
                            OEUI.message.msg({
                                text: result
                            });
                        }
                    },
                    error: function() {
                        OEUI.message.msg({
                            text: "系统繁忙，请稍后再试"
                        });
                    }
                });
        
            });
            
            //加载更多
            $(document).on("click", "#comment_btn_more", function () {
                _this.getBmPageList();
            });
            
            //关闭
            $(document).on("click", "[f='but_close_bmuser']", function(){
                if (_this.user_dialog) {
                    _this.user_dialog.remove();
                }
            });
            
        },
        
        //载入报名列表
        getBmPageList:function() {
            var _this = this;
            
            var page = $("#page").val();
            if (typeof(page) == 'undefined') {
                page = '1';
            }
            var id = $("#partyid").val();
            var obj_data = $("#bm_data");
            $.ajax({
                type: "GET",
                url:  _ROOT_PATH+"index.php?c=party",
                cache: false,
                data: {
                    a:'bmlist', page:page, partyid:id, datatype:'json'
                },
                dataType: "json",
                success: function(data) {
                    var prepage = data.prepage; //上一页
                    var nextpage = data.nextpage; //下一页
                    var result = data.result;
                    if (result != '') {
                        if (page == "1") {
                            obj_data.html(result);
                        }
                        else {
                            obj_data.append(result);
                        }
                        $("#page").val(nextpage); //重新赋值
                        
                        if (nextpage > 0) {
                            //还有下一页
                            $("#comment_btn_more").show();
                            $("#comment_btn_loading").hide();
                        }
                        else {
                            //没有下一页
                            $("#comment_btn_more").hide();
                            $("#comment_btn_loading").hide();
                        }
                        
                        //弹出页
                        if (page == '1') {
                            _this.user_dialog = OEUI.modal.dialog({
                                el:'#bmuser_dialog',
                                type: 'custom'
                            });
                        }
                    }
                },
                error: function() {
                    
                }
            });
        } 
    }
    
    window.Party = new OEParty();
});

