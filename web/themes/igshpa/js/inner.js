$(document).ready(function () {
  // scroll to hash
  if(location.hash.length !== 0) {
    var target = location.hash;
    target = target.replace( /(:|\.|\[|\]|,|=)/g, "\\$1" );
    $target = $(target);
    if ($target.length) {
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - 75
      }, 500, 'swing', function () {
        window.location.hash = target;
      });
    }
  }

  // Anchor links
  anchors.options = {
    placement: 'left',
    visible: 'hover'
  };
  anchors.add('.content-block h2, .content-block h3');

  // The function actually applying the offset
  function offsetAnchor() {
    if(location.hash.length !== 0) {
      window.scrollTo(window.scrollX, window.scrollY - 75);
    }
  }
  // 75 is page-header bottom margins (20) + padding (9) + border (1)
  // + 5px - buffer

  // This will capture hash changes while on the page
  window.addEventListener("hashchange", offsetAnchor);

  // Hash change for same hash handler
  $("h2.content-header").on("click", sameHashHandler);
  $("div.content-block h3").on("click", sameHashHandler);
  $(".sidebar a").on("click", sameHashHandler);

  function sameHashHandler (e) {
    var $this = $(this);
    var anchorData = "";
    if ($this.is("a")) {
      anchorData = $this.attr("href");
    } else {
      anchorData = "#" + $this.attr("id");
    }
    if (location.hash === anchorData) {
      e.preventDefault();
    }
  }
  var $sidebar   = $(".sidebar"),
      top     = $sidebar.offset().top - 95,
      bottom     = $("div.main").height();

  $(window).scroll(function() {
    var threshold = bottom - $sidebar.height() +
      20 + // sidebar top margin from complimentary div
      $("div.masthead").height() +
      51 + // navbar height
      $("div.inner-header").height() +
      Number($("div.inner-header").css("margin-bottom").replace(/[^-\d\.]/g, ''));
    if ($(window).scrollTop() > top && $(window).scrollTop() < threshold) {
      $sidebar.removeClass("affix-top affix-bottom");
      $sidebar.addClass("affix");
      $sidebar.css("top", "");
    } else if ($(window).scrollTop() >= threshold) {
      $sidebar.removeClass("affix affix-top");
      $sidebar.addClass("affix-bottom");
      $sidebar.css("top", bottom - $sidebar.height());
      // 95 - .sidebar.affix top - check css
    } else {
      $sidebar.removeClass("affix affix-bottom");
      $sidebar.addClass("affix-top");
      $sidebar.css("top", "");
    }
  });

  // collapsing right menu
  $(".sidebar > ul.nav > li > a").on("click", function () {
    $(".sidebar > ul.nav > li ul").each(function () {
      $(this).css("display","none");
    });
    $(this).parent().find("ul").css("display", "block");
  });
  $('#sidebar').on('activate.bs.scrollspy', function (e) {
    $(e.target).click();
  });
  // Set the date we're counting down to
  var countDownDate = new Date('Mar 14, 2017 07:00:00').getTime();

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    if ($('#countdown').length > 0) {
      document.getElementById('countdown').innerHTML = days + " days " + hours + " hours "
      + minutes + " minutes " + seconds + " seconds ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById('countdown').innerHTML = "";
      }
    }
  }, 1000);
});
