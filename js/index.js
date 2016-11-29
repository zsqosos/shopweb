/**
 * Created by MEMEME on 2016/11/22.
 */
$(function () {
    popMenu();
    var i = 1;
    $('#j_btn').click(function(){
        $('.imgbox').animate({
            left : -812*i+'px'
        },1000);
        i++;
        if(i==5) i = 0;
    })
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