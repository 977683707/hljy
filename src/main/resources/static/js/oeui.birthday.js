/**
 * [OEUI] (C)2010-2099 oelove.com biz
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * $ Last update 2020.11.24 by bo $
*/
$(function () {
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function(callback/*, thisArg*/) {
        var T, k;
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);
        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;
        // 4. If isCallable(callback) is false, throw a TypeError exception. 
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
          T = arguments[1];
        }
        // 6. Let k be 0.
        k = 0;
    
        // 7. Repeat while k < len.
        while (k < len) {
    
          var kValue;
    
          // a. Let Pk be ToString(k).
          //    This is implicit for LHS operands of the in operator.
          // b. Let kPresent be the result of calling the HasProperty
          //    internal method of O with argument Pk.
          //    This step can be combined with c.
          // c. If kPresent is true, then
          if (k in O) {
    
            // i. Let kValue be the result of calling the Get internal
            // method of O with argument Pk.
            kValue = O[k];
    
            // ii. Call the Call internal method of callback with T as
            // the this value and argument list containing kValue, k, and O.
            callback.call(T, kValue, k, O);
          }
          // d. Increase k by 1.
          k++;
        }
        // 8. return undefined.
      };
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.17
    // Reference: http://es5.github.io/#x15.4.4.17
    if (!Array.prototype.some) {
      Array.prototype.some = function(fun/*, thisArg*/) {
        'use strict';

        if (this == null) {
          throw new TypeError('Array.prototype.some called on null or undefined');
        }

        if (typeof fun !== 'function') {
          throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;

        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
          if (i in t && fun.call(thisArg, t[i], i, t)) {
            return true;
          }
        }

        return false;
      };
    }

    function Birthday (options) {
        var option = {};
        this.option = $.extend({}, option, options);
        this.el = typeof this.option.el == 'string' ? $(this.option.el) : this.option.el;
        this.year = '';
        this.month = '';
        this.date = '';
        this.events = {}; 

        this.getValue();
        this.createYear();
        this.show();
        this.hide();
        this.selectYear();
        this.selectMonth();
        this.createMonth();
        this.selectDate();
        this.switch();
    }
    Birthday.prototype = {
        getValue: function () {
            var input = this.el.find('input');
            this.year = input.eq(0).val() || '';
            this.month = input.eq(1).val() || '';
            this.date = input.eq(2).val() || '';
            
            var tab_nav = this.el.find('.tab_nav .item');
            if (this.date != '' && this.date != '0') {
                tab_nav.eq(2).html(this.date +'日').addClass('current').siblings().removeClass('current');
                tab_nav.eq(1).html(this.month + '月');
                tab_nav.eq(0).html(this.year + '年');
                this.createDate();
                this.el.find('.date').show().siblings().hide();
            } else if (this.month != '' && this.month != '0') {
                tab_nav.eq(1).html(this.month + '月').addClass('current').siblings().removeClass('current');
                tab_nav.eq(0).html(this.year + '年');
                this.createDate();
                this.el.find('.date').show().siblings().hide();
            } else if (this.year != '' && this.year != '0') {
                tab_nav.eq(0).html(this.year + '年').addClass('current').siblings().removeClass('current');
                this.el.find('.month').show().siblings().hide();
            }
        },
        on: function (name, cb){ 
            if(this.events [name]){ 
                this.events [name].push(cb); 
            } else { 
                this.events [name] = [cb]; 
            } 
        },
        callHook: function (name, arg){ 
            if(this.events [name]){ 
                var result = [];
                this.events [name] .forEach(function (eventListener) { 
                    var res = eventListener(arg); 
                    result.push(res);
                }); 
                if(result.some( function (v) {return v === false;})) {
                    return false;
                } else {
                    return true;
                }
            } 
            return true;
        },
        createYear: function () {
            var time = new Date();
            var year1 = time.getFullYear() - parseInt(this.option.range[0]);
            var year2 = time.getFullYear() - parseInt(this.option.range[1]);
            var yArr = {};
            var _this = this;
            for(var i=year1; i>=year2; i--){
                var y = parseInt(parseInt(i.toString().slice(-2))/10)+'0后';
                if(!yArr[y]) {
                    yArr[y]=[i];
                }else{
                    yArr[y].unshift(i);
                }
            }
            var html = '';
            for(var key in yArr) {
                html += '<div class="row">';
                html += '<div class="label">'+ key +'</div>';
                $.each(yArr[key], function(i, v) {
                    html += '<div class="item'+ (_this.year == v ? ' current': '') +'" data-val="'+ v +'">'+ v +'</div>';
                });
                html += '</div>';
            }
            this.el.find('.year').html(html);
        },
        show: function () {
            var _this = this;
            _this.el.on('mouseenter', function () {
                _this.el.find('.list').show().closest('.oeui_birthday_picker').css('z-index', '10000');
                _this.setPosition();
            });
        },
        hide: function () {
            var _this = this;
            _this.el.on('mouseleave', function () {
                _this.el.find('.list').hide().css({'left': '0',right: 'auto'}).closest('.oeui_birthday_picker').css('z-index', '0');
            });
        },
        setPosition: function () {
            var windowWidth= window.innerWidth;
            var left = this.el.offset().left;
            if ((+left + 582) > windowWidth) {
              this.el.find('.list').css({'left': 'auto',right: '0'});
            } 
        },
        selectYear: function () {
            var _this = this;
            _this.el.on('click', '.year .item', function () {
                var target = $(this);
                var val = target.attr('data-val');
                _this.el.find('.year .item').removeClass('current');
                target.addClass('current');
                _this.year = val;
                _this.setValue();
                _this.el.find('.month').show().siblings().hide();
                _this.el.find('.tab_nav .item').eq(1).addClass('current').siblings().removeClass('current');
            });
        },
        setValue: function () {
            var text = '';
            if (this.year && this.year != '0') {
                text += this.year;
                this.el.find('.tab_nav .item').eq(0).html(this.year+ '年');
                this.el.find('input').eq(0).val(this.year);
            }  else {
                this.el.find('.tab_nav .item').eq(0).html('选择年');
                this.el.find('input').eq(0).val('');
            }
              
            if (this.month && this.month != '0') {
                text += ('-' + this.month); 
                this.el.find('.tab_nav .item').eq(1).html(this.month+ '月');
                this.el.find('input').eq(1).val(this.month);
            } else {
                this.el.find('.tab_nav .item').eq(1).html('选择月');
                this.el.find('input').eq(1).val('');
            }

            if (this.date && this.date != '0') {
                text += ('-' + this.date); 
                this.el.find('.tab_nav .item').eq(2).html(this.date + '日');
                this.el.find('input').eq(2).val(this.date);
            } else {
                this.el.find('.tab_nav .item').eq(2).html('选择日');
                this.el.find('input').eq(2).val('');
            }
            this.el.find('.selection span').addClass('current').html(text);
            this.callHook('change', {year:this.year, month:this.month, date:this.date});
        },
        selectMonth: function () {
            var _this = this;
            _this.el.on('click', '.month .item', function () {
                var target = $(this);
                var val = target.attr('data-val');
                _this.el.find('.month .item').removeClass('current');
                target.addClass('current');
                _this.month = val;
                _this.setValue();
                _this.createDate();
                _this.el.find('.date').show().siblings().hide();
                _this.el.find('.tab_nav .item').eq(2).addClass('current').siblings().removeClass('current');
            });
        },
        createMonth: function () {
            var html = '\
              <div class="item'+ (this.month == 1 ? ' current': '') +'" data-val="1">1</div>\
              <div class="item'+ (this.month == 2 ? ' current': '') +'" data-val="2">2</div>\
              <div class="item'+ (this.month == 3 ? ' current': '') +'" data-val="3">3</div>\
              <div class="item'+ (this.month == 4 ? ' current': '') +'" data-val="4">4</div>\
              <div class="item'+ (this.month == 5 ? ' current': '') +'" data-val="5">5</div>\
              <div class="item'+ (this.month == 6 ? ' current': '') +'" data-val="6">6</div>\
              <div class="item'+ (this.month == 7 ? ' current': '') +'" data-val="7">7</div>\
              <div class="item'+ (this.month == 8 ? ' current': '') +'" data-val="8">8</div>\
              <div class="item'+ (this.month == 9 ? ' current': '') +'" data-val="9">9</div>\
              <div class="item'+ (this.month == 10 ? ' current': '') +'" data-val="10">10</div>\
              <div class="item'+ (this.month == 11 ? ' current': '') +'" data-val="11">11</div>\
              <div class="item'+ (this.month == 12 ? ' current': '') +'" data-val="12">12</div>\
            ';
            this.el.find('.month').html(html);
        },
        createDate: function () {
            var html = '';
            var time = new Date(this.year, this.month ,0);
            var dayN = time.getDate();
            var html = '';
            for(var i=1; i<=dayN; i++){
                html += '<div class="item'+ (this.date == i ? ' current': '') +'" data-val="'+ i +'">'+ i +'</div>';
            }
            this.el.find('.date').html(html);
        },
        selectDate: function () {
            var _this = this;
            _this.el.on('click', '.date .item', function () {
                var target = $(this);
                var val = target.attr('data-val');
                _this.el.find('.date .item').removeClass('current');
                target.addClass('current');
                _this.date = val;
                _this.setValue();
                _this.el.find('.list').hide();
            });
        },
        switch: function () {
            var _this = this;
            _this.el.on('click', '.tab_nav .item', function () {
                var target = $(this);
                var index = target.index();
                if (index == 1 && _this.year == '') {
                    OEUI.message.msg({text: '请选择年份'});
                    return;
                }
                if (index == 2 && _this.month == '') {
                    OEUI.message.msg({text: '请选择月份'});
                    return;
                }
                target.addClass('current').siblings().removeClass('current'); 
                _this.el.find('.tab_content .content').eq(index).show().siblings().hide();
            });
        },

    }
    window.Birthday = Birthday;
});