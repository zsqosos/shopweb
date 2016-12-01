/**
 * Created by MEMEME on 2016/11/22.
 */
$(function () {
    var bg = $.extend(true,{},carousel);
    var sm1 = $.extend(true,{},carousel);
    var sm2 = $.extend(true,{},carousel);
    bg.startPlay('#J_bg_ban','#J_bg_indicator','#J_bg_btn');
    sm1.startPlay('#J_sm_ban1','#J_sm_indicator1');
    sm2.startPlay('#J_sm_ban2','#J_sm_indicator2');
    popMenu();
});

function popMenu (){
    $('.shoplist-items').hover(function (){
        var $inedx = $(this).index();
        $('.popshop').eq($inedx).addClass('show').siblings('.popshop').removeClass('show');
    },function (){
      $('.popshop').removeClass('show');
    });
    $('.popshop').hover(function(){
        $(this).addClass('show');
    },function(){
        $(this).removeClass('show');
    })
}
//ÂÖ²¥¶ÔÏó
var carousel = {
    now : 0,
    hasStarted : false,
    interval : null,
    liItems : null,
    len : 0,
    aBox : null,
    bBox : null,
    startPlay : function(bannnerBox,aBox,btnBox) {
        var that = this;
        this.liItems = $(bannnerBox).find('ul').find('li');
        this.len = this.liItems.length;
        this.liItems.first('li').css({'opacity': 1, 'z-index': 1}).siblings('li').css({'opacity': 0, 'z-index': 0});
        var aDom = '';
        for (var i = 0; i < this.len; i++){
            aDom += '<a></a>';
        }
        this.aBox = $(bannnerBox).find(aBox);
        this.bBox = $(bannnerBox).find(btnBox);
        $(aDom).appendTo(this.aBox);
        this.aBox.find('a:first').addClass("imgnum-active");
        this.bBox.hide();

        $(bannnerBox).hover(function (){
            that.stop();
            that.bBox.fadeIn(200);
        }, function (){
            that.start();
            that.bBox.fadeOut(200);
        });
        this.aBox.find('a').hover(function (){
            that.stop();
            var out = that.aBox.find('a').filter('.imgnum-active').index();
            that.now = $(this).index();
            if(out!=that.now) {
                that.play(out, that.now)
            }
        }, function (){
            that.start();
        });

        $(btnBox).find('a:first').click(function(){that.next()});
        $(btnBox).find('a:last').click(function(){that.prev()});

        this.start()
    },
    prev : function (){
        var out = this.now;
        this.now = (--this.now + this.len) % this.len;
        this.play(out, this.now);
    },

    next : function (){
        var out = this.now;
        this.now = ++this.now % this.len;
        this.play(out, this.now);
    },

    play : function (out, now){
        this.liItems.eq(out).stop().animate({opacity:0,'z-index':0},500).end().eq(now).stop().animate({opacity:1,'z-index':1},500);
        this.aBox.find('a').removeClass('imgnum-active').eq(now).addClass('imgnum-active');
    },
    start : function(){
        if(!this.hasStarted) {
            this.hasStarted = true;
            var that = this;
            this.interval = setInterval(function(){
                that.next();
            },2000);
        }
    },
    stop : function (){
        clearInterval(this.interval);
        this.hasStarted = false;
    }
};

