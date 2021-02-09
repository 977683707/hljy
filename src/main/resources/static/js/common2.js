/**
 * [OEUI] (C)2010-2099 oelove.com biz
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * This is NOT a freeware, use is subject to license terms
 * $ Last update 2020.11.11 by CL $ for oepcui
*/
var JS_ANIMATE_TIME = 200;
var JS_FADEIN_TIME = 200;
var JS_FADEOUT_TIME = 200;

//随机数
function get_rndnum(n) {
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var res = "";
	for(var i = 0; i < n ; i ++) {
		var id = Math.ceil(Math.random()*35);
		res += chars[id];
	}
	return res;
}
function getRndnum(n) {
	var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var res = "";
	for(var i = 0; i < n ; i ++) {
		var id = Math.ceil(Math.random()*35);
		res += chars[id];
	}
	return res;
}
//判断字符长度，一个汉字为2个字符
function strlen(s){
	var l = 0;
	var a = s.split("");
	for (var i=0;i<a.length;i++){
		if (a[i].charCodeAt(0)<299){
			l++;
		}else{
			l+=2;
		}
	}
	return l;
}
//判断字数个数
function strQuantity(s){
	var l = 0;
	var a = s.split("");
	for (var i=0;i<a.length;i++){
		if (a[i].charCodeAt(0)<299){
			l++;
		}else{
			l++;
		}
	}
	return l;
}

//set cookie
function _setCookie2(name, value, days) {
    if (typeof(days) == "undefined") {
        days = 30; //默认30天
    }
    var exp = new Date();
    exp.setTime(exp.getTime()+(days*24*60*60*1000));
    document.cookie = name+"="+escape(value)+";expires="+exp.toGMTString();
}

//get cookie
function _getCookie2(name) {
    var arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return "";
    }
}

//del cookie 
function _delCookie2(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cookie_val = _getCookie2(name);
    if (cookie_val != null) {
        document.cookie= name+"="+cookie_val+";expires="+exp.toGMTString();
    }
}

//set cookie 按分钟保存
function _setCookieMin2(name, value, min) {
    if (typeof(min) == "undefined") {
        min = 1; //默认1分钟....
    }
    var exp = new Date();
    exp.setTime(exp.getTime()+(min*60*1000));
    document.cookie = name+"="+escape(value)+";expires="+exp.toGMTString();
}