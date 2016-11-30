/**
 * Created by MEMEME on 2016/11/22.
 */
$(function () {
    //console.log($.carousel.len('#j_bn'));
    var now = 0;
    var hasStarted = false;
    var liItems =$('#j_bn').find('ul').find('li');
    var len = liItems.length;
    //初始化
    liItems.first('li').css({'opacity':1,'z-index':1}).siblings('li').css({'opacity':0,'z-index':0});
    var aDom = '';
    for(var i=0; i<len; i++){
        aDom += '<a></a>';
    }
    $(aDom).appendTo($('.banner .imgnum'));
    $('.imgnum').find('a:first').addClass("imgnum-active");
    $('.ban-btn').hide();

    $('#j_bn').hover(function(){
        mystop();
        $('.ban-btn').fadeIn(200);
    },function(){
        mystart();
        $('.ban-btn').fadeOut(200);
    });


    $('.imgnum').find('a').hover(function(){
        mystop();
        var preIndex = $('.imgnum').find('a').filter('.imgnum-active').index();
        now = $(this).index();
        play(preIndex,now)
    },function(){
        mystart();
    });

    $('.next-btn').click(function(){
        mynext();
    });
    $('.prev-btn').click(function(){
        pre();
    });

    function pre() {
        var preIndex = now;
        now = (--now + len) % len;
        play(preIndex, now);
    }
    /**
     * 向后翻页
     */
    function mynext() {
        var preIndex = now;
        now = ++now % len;
        play(preIndex, now);
    }
    /**
     * 从preIndex页翻到currentIndex页
     * preIndex 整数，翻页的起始页
     * currentIndex 整数，翻到的那页
     */
    function play(preIndex, now) {
        liItems.eq(preIndex).stop().animate({opacity:0,'z-index':0},500).parent().children().eq(now).stop().animate({opacity:1,'z-index':1},500);
        $('.imgnum').find('a').removeClass('imgnum-active').eq(now).addClass('imgnum-active');
    }
    /**
     * 开始轮播
     */
    function mystart() {
        if(!hasStarted) {
            hasStarted = true;
            interval = setInterval(mynext, 3000);
        }
    }
    /**
     * 停止轮播
     */
    function mystop() {
        clearInterval(interval);
        hasStarted = false;
    }
//开始轮播
    mystart();


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
//轮播对象
$.carousel = {
    now : 1,
    hasStarted : false,
    interval : null,
    len : 5,
    liItems : function(id){
        return $(id).find('ul').find('li');
    },
    //len : function(id){
    //    return $(id).find('ul').find('li').length;
    //}
    start : function(bannerId,aBoxClass,btnBoxClass) {
        var liItems = $(bannerId).find('ul').find('li');
        var len = liItems.length;
        //初始化
        liItems.first('li').css({'opacity': 1, 'z-index': 1}).siblings('li').css({'opacity': 0, 'z-index': 0});
        var aDom = '';
        for (var i = 0; i < len; i++) {
            aDom += '<a></a>';
        }
        var aBox = $(bannerId).find(aBoxClass);
        $(aDom).appendTo(aBox);
        aBox.find('a:first').addClass("imgnum-active");
        aBox.hide();

        $(bannerId).hover(function () {
            this.mystop();
            aBox.fadeIn(200);
        }, function () {
            this.mystart();
            aBox.fadeOut(200);
        });


        aBox.find('a').hover(function () {
            this.mystop();
            var preIndex = aBox.find('a').filter('.imgnum-active').index();
            this.now = $(this).index();
            this.play(preIndex, this.now)
        }, function () {
            this.mystart();
        });

        $(btnBoxClass).find('a:last-child').click(this.mynext());
        $(btnBoxClass).find('a:first-child').click(this.pre());
    },
    pre : function (){
        var preIndex = this.now;
        this.now = (--this.now + this.len) % this.len;
        this.play(preIndex, this.now);
    },

    mynext : function (){
        var preIndex = this.now;
        this.now = ++this.now % this.len;
        this.play(preIndex, this.now);
    },

    play : function (preIndex, now){
        this.liItems('#j_bn').eq(preIndex).stop().animate({opacity:0,'z-index':0},500).parent().children().eq(now).stop().animate({opacity:1,'z-index':1},500);
        $('.imgnum').find('a').removeClass('imgnum-active').eq(now).addClass('imgnum-active');
    },
    mystart : function() {
        if(!this.hasStarted) {
            this.hasStarted = true;
            this.interval = setInterval(mynext, 3000);
        }
    },
    mystop : function (){
        clearInterval(this.interval);
        this.hasStarted = false;
    },
    //开始轮播
    startplay : this.mystart()

};

