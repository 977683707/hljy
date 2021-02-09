/**
 * [OEUI] (C)2010-2099 oelove.com  biz
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * $ Last update 2020/11/16 by CL $
*/
$(function () {

    function OEGuestBook() {
        this.obj_id = '';
        this._this_dialog = null;
        
        this.w = 600;
        this.h = 580;
        
        this.clickAdd();
        this.clickSubmit();
        
    }

    OEGuestBook.prototype = {
        
        //弹出留言
        clickAdd:function() {
            var _this = this;
            
            $(document).on("click", "[f='pop_guestbook']", function(){
                
                var width = $(this).attr("data-width");
                if (typeof (width) == "undefined") {
                    width = _this.w;
                }
                var height = $(this).attr("data-height");
                if (typeof (height) == "undefined") {
                    height = _this.h;
                }
                _this._this_dialog = OEUI.modal.dialog({
                    type: 'iframe',
                    title: '留言反馈',
                    width: width,
                    height: height,
                    content: _ROOT_PATH+'index.php?c=index&a=guestbook'
                });
            });
        },
        
        //提交留言
        clickSubmit:function() {
            var _this = this;
            
            $(document).on("click", "[f='but_submit_guestbook']", function(){
                _this.obj_id = $(this).attr('id');
                
                var catid = $("#catid").val();
                if (catid == '' || catid == '0') {
                    OEUI.message.msg({
                        text: '请选择分类'
                    });
                    return false;
                }
                var title = $("#title").val();
                if (title == '') {
                    OEUI.message.msg({
                        text: '请填写标题'
                    });
                    return false;
                }
                var content = $("#content").val();
                if (content == '') {
                    OEUI.message.msg({
                        text: '请填写留言内容'
                    });
                    return false;
                }
                
                var email = $("#email").val();
                if (email == '') {
                    OEUI.message.msg({
                        text: '请填写联系邮箱'
                    });
                    return false;
                }
                
                var img1 = $("#img_url").val();
                
                if (!$("#"+_this.obj_id).hasClass("forbid_submit")) {
                    $("#"+_this.obj_id).addClass("forbid_submit");
                    var loading = OEUI.loading({
                        el: this,
                        width: 30,
                        height: 30
                    });
                    loading.show();
                    
                    $.ajax({
                        type: "POST",
                        url: _ROOT_PATH + "index.php?c=index",
                        cache: false,
                        data: {
                            a: "saveguestbook", catid: catid, title: title,
                            content:content, email:email, img1:img1
                        },
                        dataType: "json",
                        success: function (data) {
                            var response = data.response;
                            var result = data.result;
                            if (response == '1') {
                                OEUI.message.msg({
                                    text: '留言成功，请等待客服处理！'
                                });
                                setTimeout(function () {
                                    window.top.location.reload();
                                }, 800);
                            }
                            else {
                                if (result == '' || result == null) {
                                    result = '提交失败，请检查';
                                }
                                OEUI.message.msg({
                                    text: result
                                });
                            }
                            
                            $("#"+_this.obj_id).removeClass("forbid_submit");
                            loading.remove();
                        },
                        error: function () {
                            OEUI.message.msg({
                                text: "系统繁忙，请稍后再试"
                            });
                            
                            $("#"+_this.obj_id).removeClass("forbid_submit");
                            loading.remove();
                        }
                    });
                }
            });
        }
    }
    window.GuestBook = new OEGuestBook();
})