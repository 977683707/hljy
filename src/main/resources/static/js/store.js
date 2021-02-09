/**
 * [OEUI] (C)2010-2099 oelove.com biz
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * $ Last update 2020/11/17 by CL $
*/
$(function(){
    
    function OEStore() {
        this.store_dialog = null;
        this.obj_id = '';
        this.clickView();
        this.clickFollow();
    }
    
    OEStore.prototype = {
        
        //查看商家
        clickView:function() {
            var _this = this;
            $(document).on("click", '[f="but_view_store"]', function(){
                var uid = $(this).attr("data-uid");
                var sid = $(this).attr("data-sid");
                if (typeof (uid) == 'undefined') {
                    uid = 0
                }
                if (typeof (sid) == 'undefined') {
                    sid = 0
                }
                if (uid == '' || uid == '0') {
                    OEUI.message.msg({
                        text: '参数错误'
                    });
                    return false;
                }
                if (sid == '' || sid == '0') {
                    OEUI.message.msg({
                        text: '参数错误'
                    });
                    return false;
                }
                
                //block_view_store
                var url = _ROOT_PATH+"index.php?c=home&a=getstore";
                $.ajax({
                    type: "POST",
                    url: url,
                    cache: false,
                    dataType: "json",
                    data: {
                        uid:uid, sid:sid, datatype:"json"
                    },
                    success: function(data){
                        var response = data.response;
                        var result = data.result;
                        if (response == '1') {
                            $("#store_data").html(result);
                            //$("#store_data").show();                           
                            _this.store_dialog = OEUI.modal.dialog({
                                el:'#store_dialog',
                                type: 'custom'
                            });
                            
                        }
                        else {
                            if (result == '' || result == null) {
                                result = '操作失败，请检查';
                            }
                            OEUI.message.msg({
                                text: result
                            });
                        }
                    },
                    error: function(){
                        OEUI.message.msg({
                            text: '系统繁忙，请稍后再试'
                        });
                    }
                });
            });
            $(document).on("click", '[f="but_store_close"]', function(){
                //$("#store_detail_box").remove();
                if (_this.store_dialog) {
                    _this.store_dialog.remove();
                }
            });
        },
        
        //关注收藏
        clickFollow:function() {
            var _this = this;
            
            $(document).on("click", "[f='but_submit_follow']", function(){
                _this.obj_id = $(this).attr('id');
                
                var id = $(this).attr("data-id");
                var url = _ROOT_PATH +"index.php?c=home&a=follow";
                
                
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        id:id, datatype:"json"
                    },
                    cache: false,
                    dataType: "json",
                    success: function(data){
                        var response = data.response;
                        var result = data.result;
                        if (response == '1') {
                            if ($("#"+_this.obj_id).hasClass("bg_de")) {
                                $("#"+_this.obj_id).removeClass('bg_de color_6');
                                $("#"+_this.obj_id).addClass('bg_main color_f');
                                
                                $("#"+_this.obj_id).html('单身请关注');
                                OEUI.message.msg({
                                    text: '已取消关注'
                                });
                            }
                            else{
                                $("#"+_this.obj_id).removeClass('bg_main color_f');
                                $("#"+_this.obj_id).addClass('bg_de color_6');
                                $("#"+_this.obj_id).html('已关注');
                                OEUI.message.msg({
                                    text: '关注成功'
                                });
                            }
                        }
                        else {
                            if (result == '' || result == null) {
                                result = '操作失败，请检查';
                            }
                            OEUI.message.msg({
                                text: result
                            });
                        }
                    },
                    error: function(){
                        OEUI.message.msg({
                            text: '系统繁忙，请稍后再试'
                        });
                    }
                });

            });
        }
    }
    
    new OEStore();
});


