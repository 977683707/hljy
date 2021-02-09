/**
 * [OEUI] (C)2010-2099 oelove.com Inc.biz
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * $ Last update 2020/11/16 by CL $
*/
$(function () {
    function OEUser() {
        this._this_dialog = null;
        this.map_dialog = null;
        this.tims = null;
        
        this.getListRankUser();
        this.clickSearch();
        this.clickMap();
    }

    OEUser.prototype = {
        
        //搜索靠前用户
        getListRankUser:function() {
            var _this = this;
            
            var url = $("#rank_url").val();
            if (typeof(url) == 'undefined') {
                url = '';
            }
            //ajax_rankuser.tpl
            if (url != '') {
                $.ajax({
                    type: "POST",
                    url: url,
                    cache: false,
                    data: {
                    },
                    dataType: "json",
                    success: function (data) {
                        var response = data.response;
                        var result = data.result;
                        if (response == "1") {
                            $("#rank_user_box").html(result);
                            _this.scrollList();
                            _this.clickScroll();
                        }
                    },
                    error: function () {

                    }
                });
            }
        },
        
        //滚动列表
        scrollList: function () {
            var info = document.getElementById('info');
            var div = document.getElementById('rank_user_box');
            var p = div.childNodes[1];
            var p_w = p.offsetWidth;
            var div_w = info.offsetWidth;
            if (div_w > p_w) { return false; }
            div.innerHTML
            div.innerHTML += div.innerHTML;
            this.tims = setInterval(function () {
                if (p_w <= info.scrollLeft) {
                    info.scrollLeft -= p_w;
                } 
                else {
                    info.scrollLeft++;
                }
            }, 50);
        },
        
        //点击切换滚动
        clickScroll:function() {
            var _this = this;
            $('#rank_user_box').on('mouseover', function () {
                clearInterval(_this.tims);
            });
            $('#rank_user_box').on('mouseout', function () {
                var info = document.getElementById('info');
                var div = document.getElementById('rank_user_box');
                var p = div.childNodes[1];
                var p_w = p.offsetWidth;
                var div_w = info.offsetWidth;
                if (div_w > p_w) { return false; }
                _this.tims = setInterval(function () {
                    if (p_w <= info.scrollLeft) {
                        info.scrollLeft -= p_w;
                    }
                    else {
                        info.scrollLeft++;
                    }
                }, 50);
            });
        },
        
        //搜索
        clickSearch:function() {
            var _this = this;
            
            //搜索
            $(document).on("click", "[f='but_submit_search']", function(){
                var obj_id = $(this).attr('id');
                var loading = OEUI.loading({
                    el: '#'+obj_id,
                    width: 30,
                    height: 30
                });
                loading.show();
    
                setTimeout(function(){
                    $("#search_form").submit();
                }, 100);
            });
            
            //切换排序
            $(document).on("click", "[f='but_ser_orderby']", function () {
                var val = $(this).attr("data-val");
                $("#s_orderby").val(val);
                setTimeout(function(){
                    $("#search_form").submit();
                }, 100);
            });
            
            //附近的人 
            $(document).on("click", "[f='but_search_map']", function () {
                var val = $(this).attr("data-val");
                if (typeof (val) == "undefined") {
                    val = "1";
                }
                $("#s_map").val(val);
                setTimeout(function(){
                    $("#search_form").submit();
                }, 100);
            });
        },
        
        //设置坐标
        clickMap:function() {
            var _this = this;
            
            $(document).on("click", "[f='but_set_map']", function () {
                var login_status = $(this).attr("data-loginstatus");
                if (typeof(login_status) == 'undefined') {
                    login_status = '1';
                }
                if (login_status == '0') {
                    //window.location.href = _ROOT_PATH+'index.php?c=passport&a=login';
                    OEPOP.jdLogin();
                    return false;
                }
                
                OEUI.message.msg({
                    text: '你还没标注地图位置，请先标注',
                    time: 1000
                });
                setTimeout(function () {
                    _this.map_dialog = OEUI.modal.dialog({
                        title: '设置地图坐标',
                        type: 'iframe',
                        width: '900',
                        height: '660',
                        content: _ROOT_PATH + "index.php?m=user&c=map"
                    });
                }, 800);
            });
        }
    }
    
    window.User = new OEUser();
});