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
//�ֲ�����
var carousel = {
    now : 0,                    //��ǰ��ʾ��ͼƬ����
    hasStarted : false,         //�Ƿ�ʼ�ֲ�
    interval : null,            //��ʱ��
    liItems : null,             //Ҫ�ֲ���liԪ�ؼ���
    len : 0,                    //liItems�ĳ���
    aBox : null,                //����ָʾ����dom����
    bBox : null,                //����ǰ��ť��dom����

    /**
     * ��ʼ�������ƺ���
     * @param bannnerBox string ���������ֲ�ͼ���ӵ�id��class
     * @param aBox  string ����ָʾ���ĺ��ӵ�id��class
     * @param btnBox string ����ǰ��ť�ĺ��ӵ�id��class
     */
    startPlay : function(bannnerBox,aBox,btnBox) {
        //��ʼ���������
        var that = this;
        this.liItems = $(bannnerBox).find('ul').find('li');
        this.len = this.liItems.length;
        this.aBox = $(bannnerBox).find(aBox);
        this.bBox = $(bannnerBox).find(btnBox);
        //�õ�һ��ͼƬ��ʾ�������ֲ�ͼ������̬����ָʾ�������õ�һ��ָʾ�����ڼ���״̬������ǰ��ť
        this.liItems.first('li').css({'opacity': 1, 'z-index': 1}).siblings('li').css({'opacity': 0, 'z-index': 0});
        var aDom = '';
        for (var i = 0; i < this.len; i++){
            aDom += '<a></a>';
        }
        $(aDom).appendTo(this.aBox);
        this.aBox.find('a:first').addClass("imgnum-active");
        this.bBox.hide();
        //�������bannerͼʱ��ֹͣ�ֲ�����ʾǰ��ť���Ƴ�ʱ��ʼ�ֲ�������ǰ��ť
        $(bannnerBox).hover(function (){
            that.stop();
            that.bBox.fadeIn(200);
        }, function (){
            that.start();
            that.bBox.fadeOut(200);
        });
        //�������ָʾ��ʱ����ʾ��ӦͼƬ���Ƴ�ʱ��������
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
        //������Ұ�ťʱ��ʾ��һ�Ż���һ��
        $(btnBox).find('a:first').click(function(){that.next()});
        $(btnBox).find('a:last').click(function(){that.prev()});
        //��ʼ�ֲ�
        this.start()
    },
    //ǰһ�ź���
    prev : function (){
        var out = this.now;
        this.now = (--this.now + this.len) % this.len;
        this.play(out, this.now);
    },
    //��һ�ź���
    next : function (){
        var out = this.now;
        this.now = ++this.now % this.len;
        this.play(out, this.now);
    },
    /**
     * ���ź���
     * @param out number Ҫ��ʧ��ͼƬ������ֵ
     * @param now number ������Ҫ�ֲ���ͼ������ֵ
     */
    play : function (out, now){
        this.liItems.eq(out).stop().animate({opacity:0,'z-index':0},500).end().eq(now).stop().animate({opacity:1,'z-index':1},500);
        this.aBox.find('a').removeClass('imgnum-active').eq(now).addClass('imgnum-active');
    },
    //��ʼ����
    start : function(){
        if(!this.hasStarted) {
            this.hasStarted = true;
            var that = this;
            this.interval = setInterval(function(){
                that.next();
            },2000);
        }
    },
    //ֹͣ����
    stop : function (){
        clearInterval(this.interval);
        this.hasStarted = false;
    }
};

