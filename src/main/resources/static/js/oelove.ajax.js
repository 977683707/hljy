/**
 * [OEUI] (C)2010-2099 oelove.com Inc.biz
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * $ Last update 2020/11/11 by CL $
 * [ 通用 ajax function ]
*/
//同步附件云存储 20.11.11
function _oeloveFileSynYun(id) {
	if (id != '') {
		$.ajax({
			type: "POST",
			url:  _ROOT_PATH+"index.php?c=ajax",
			cache: false,
			data: {
                a:"synyun", id:id
            },
			dataType: "json",
			success: function(data) {
				var response = data.response;
				var result = data.result;
				if (response == "1") {
                    //成功
				}
				else {
                    //失败
				}
			},
			error: function() {
			}
		});
	}
}