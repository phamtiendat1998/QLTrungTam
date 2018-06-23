import $ from 'jquery';
$(document).ready(function () {
  // Spinner
  $('.spinner').fadeOut(500, function () {
    $('.content-body').fadeIn(500)
    new WOW().init();
  })
})