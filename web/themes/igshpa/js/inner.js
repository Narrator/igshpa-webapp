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
      bottom     = $("div.main").height() + 160;

  $(window).scroll(function() {
    if ($(window).scrollTop() > top && $(window).scrollTop() < bottom) {
      $sidebar.removeClass("affix-top affix-bottom");
      $sidebar.addClass("affix");
      $sidebar.css("top", "");
    } else if ($(window).scrollTop() >= bottom) {
      $sidebar.removeClass("affix affix-top");
      $sidebar.addClass("affix-bottom");
      $sidebar.css("top", bottom - $sidebar.height() - 160 - 40);
      // 160 - total height of header
      // 40 - bottom margin of content-block
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
});
