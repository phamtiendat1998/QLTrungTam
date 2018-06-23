import $ from 'jquery';

$(window).scroll(function () {
    var wScroll = $(this).scrollTop();
    if (wScroll > 300) {
        $('.btn-scroll').fadeIn();
    } else {
        $('.btn-scroll').fadeOut();
    }
})

$('.btn-scroll').click(function(){
    $('body,html').animate({
        scrollTop: 0
    },2000);
    return false;
});
