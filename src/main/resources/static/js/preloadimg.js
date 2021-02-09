/**
 * [OElove] (C)2010-2099 oelove.com Inc.biz
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * This is NOT a freeware, use is subject to license terms
 * $ Last update 2019/10/12 by OE $
*/
//预加载图片 9.10.12
function preload_img() {
    var img = $("[preload='0']");
    if (typeof(img) == "undefined"){
        return;
    }
    var imgEl = [];
    $.each(img, function(i, v) {
        $_src_img = $(v).attr('data-src');
        if (typeof($_src_img) == "undefined") {
            $_src_img = "";
        }
        if ($_src_img.length > 0) {
            imgEl[i] = new Image();
            imgEl[i].onload = function(){
                $(v).attr('src', $(v).attr('data-src'));
                $(v).attr("preload", "1");
            };  
            imgEl[i].src = $(v).attr('data-src');
        }
    });
}