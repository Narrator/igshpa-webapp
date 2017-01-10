$(document).ready(function () {
  // scroll bar on top
  $(this).scrollTop(0);

  var rtime;
  var timeout = false;
  var delta = 1;
  // carousel height and autoHhidingNavbar
  var browserWidth = $(window).width();
  var carouselHeight = 25/100 * browserWidth;
  $(".carousel .item").css("height",carouselHeight);
  if (!$(".carousel .item").length) {
    carouselHeight = 110;
  }
  $(".carousel").carousel({
      interval: false
  });
  $("div.masthead").autoHidingNavbar({
    animationDuration: 100,
    showOnBottom: false,
    showOnUpscroll:false,
    hideOffset: carouselHeight
  });

  // Navbar hiding events
  $("div.masthead").on("hide.autoHidingNavbar", function() {
    $("nav.navbar-fixed-top").css("top","0px");

    $("div.navbar-social").css("visibility","visible");
    $("div.navbar-social").css("transition-delay","0s");
    $("div.navbar-social").css("opacity","1");

    $("li.brand-home img").css("visibility","visible");
    $("li.brand-home img").css("transition-delay","0s");
    $("li.brand-home img").css("opacity","1");

    $("div.header-social").css("visibility","hidden");
    $("div.header-social").css("opacity","0");
    $("div.header-social")
      .css("transition", "visibility 0s linear 0.2s,opacity 0.2s linear");

    $("li.brand-home a").css("visibility","hidden");
    $("li.brand-home a").css("opacity","0");
    $("li.brand-home a")
      .css("transition", "visibility 0s linear 0.2s,opacity 0.2s linear");

    $("div.carousel.slide").css("visibility", "hidden");
    $("div.carousel.slide").css("opacity","0");
    $("div.carousel.slide")
      .css("transition", "visibility 0s linear 0.2s,opacity 0.2s linear");
  });
  $("div.masthead").on("show.autoHidingNavbar", function() {
    var sWidth = getScrollBarWidth();
    var wThreshold1 = 992 - sWidth;
    var wThreshold4 = 768 - sWidth;
    if ($(window).width() > wThreshold1) {
      $("nav.navbar-fixed-top").css("top","110px");
      $("nav.navbar-fixed-top").css("margin-top","0px");
    }

    if($(window).width() <= wThreshold1) {
      $("nav.navbar-fixed-top").css("top","90px");
      $("nav.navbar-fixed-top").css("margin-top","0px");
    }

    if ($(window).width() <= wThreshold4) {
      $("nav.navbar-fixed-top").css("top","1px");
      $("nav.navbar-fixed-top").css("margin-top","-1px");
    }

    $("div.navbar-social").css("visibility","hidden");
    $("div.navbar-social").css("opacity","0");
    $("div.navbar-social")
      .css("transition", "visibility 0s linear 0.2s,opacity 0.2s linear");

    $("li.brand-home img").css("visibility","hidden");
    $("li.brand-home img").css("opacity","0");
    $("li.brand-home img")
      .css("transition", "visibility 0s linear 0.2s,opacity 0.2s linear");

    $("div.header-social").css("visibility","visible");
    $("div.header-social").css("transition-delay","0s");
    $("div.header-social").css("opacity","1");

    $("li.brand-home a").css("visibility","visible");
    $("li.brand-home a").css("transition-delay","0s");
    $("li.brand-home a").css("opacity","1");

    $("div.carousel.slide").css("visibility", "visible");
    $("div.carousel.slide").css("transition-delay","0s");
    $("div.carousel.slide").css("opacity","1");
  });
  function getScrollBarWidth () {
    var $outer = $('<div>').css({
      visibility: 'hidden',
      width: 100,
      overflow: 'scroll'
    }).appendTo('body'),
      widthWithScroll = $('<div>')
        .css({width: '100%'})
        .appendTo($outer)
        .outerWidth();
      $outer.remove();
      return 100 - widthWithScroll;
  };
  function resizeend() {
    if (new Date() - rtime < delta) {
      setTimeout(resizeend, delta);
    } else {
      timeout = false;
      browserWidth = $(window).width();
      carouselHeight = 25/100 * browserWidth;
      $(".carousel .item").css("height",carouselHeight);
      var sWidth = getScrollBarWidth();
      var wThreshold2 = 992 - sWidth;
      var wThreshold3 = 768 - sWidth;
      if($("nav.navbar-fixed-top").position().top !== 0) {
        $(".masthead").css("top", "0px");
        if ($(window).width() > wThreshold2) {
          $("nav.navbar-fixed-top").css("top","110px");
          $("nav.navbar-fixed-top").css("margin-top","0px");
        }

        if($(window).width() <= wThreshold2) {
          $("nav.navbar-fixed-top").css("top","90px");
          $("nav.navbar-fixed-top").css("margin-top","0px");
        }

        if ($(window).width() <= wThreshold3) {
          $("nav.navbar-fixed-top").css("top","1px");
          $("nav.navbar-fixed-top").css("margin-top","-1px");
        }
      }
      if($("nav.navbar-fixed-top").position().top === 0) {
        $(".masthead").css("top","-" +
          $(".masthead").height() + "px");
      }
    }
  }

  // Window resizing events
  $(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeend, delta);
    }
  });
});
