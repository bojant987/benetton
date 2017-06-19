$(document).ready(function() {
  "use strict";

  // popin handler
  $("body").on("click", ".popin-handler", function(e) {
    var role = $(this).attr("data-role");
    var target = $(this).attr("data-target");

    if (role === "open") {
      $(".navigation-left").removeClass("navigation-show");
      $(".login-box").removeClass("login-box-show");
      $(".cart-box").removeClass("cart-box-show");

      $("#" + target).addClass(target + "-show");

      if (target === "navigation") {
        $(".navigation-left .navigation-toggle").show();
      }
      $("body").addClass("modal-open");
      $(".overlay").show();
    } else if (role === "close") {
      $("#" + target).removeClass(target + "-show");


      $(".navigation-left .navigation-toggle").hide();

      $("body").removeClass("modal-open");
      $(".overlay").hide();
    }
  });

  // window resize changes
  $(window).resize(function() {

    if ($(window).width() > 992) {
      $(".navigation-left").removeClass("navigation-show");
      $(".overlay").hide();
    }

    if ($(window).width() > 768) {
      $(".categories .category-list").show();
    } else {
      $(".categories .category-list").hide();
    }

    if ($(window).width() > 991) {
      $(".navigation-left > ul > li").css("position", "static");
    } else {
      $(".navigation-left > ul > li").css("position", "relative");
    }

    searchBoxPosition();
    navDropdownHover();
  });

  $(document).scroll(function() {

    setTimeout(function functionName() {
      searchBoxPosition();
      navDropdownPosition();
    }, 150);

  });



  // search box position
  function searchBoxPosition() {
    var headerHeight = $("header").height();

    $(".search-box").css("top", headerHeight);
  }

  searchBoxPosition();

  // nav dropdown position
  function navDropdownPosition() {
    var headerHeight = $("header").height();
    if ($(window).width() > 992) {
      $(".nav-dropdown").css("top", headerHeight);
    }
  }

  navDropdownPosition();

  // search box handler
  $(".search-handler").click(function(e) {
    e.preventDefault();

    $(".search-box").fadeToggle();
  });

  // accordion
  $(".accordion-handler").click(function(e) {
    var accordionLevel = $(this).next().attr("data-accordion");
    var target = $(this).attr("data-target");
    var currentTarget = $(this);

    $(this).toggleClass("show");

    if (target === "level3") {

      $(this).parent().siblings("li").find(".accordion-handler").removeClass("show");

      $(".accordion-content").each(function() {
        if ($(this).attr("data-accordion") === "level3") {
          $(this).slideUp();
        }
      });

    } else if (target === "level2") {
      $(this).parent().siblings("li").find(".accordion-handler").removeClass("show");

      $(".accordion-content").each(function() {

        if ($(this).attr("data-accordion") === "level2") {
          $(this).slideUp();
        }
      });

    } else {
      $(".accordion-content").slideUp();
      $(".accordion-handler").each(function() {
        if ($(this).get(0) !== currentTarget.get(0)) {
          $(this).removeClass("show");
        }
      });

    }

    if ($(this).next().is(":hidden")) {
      $(this).next().slideDown();
    }

  });

  // nav dropdown
  function navDropdownHover() {
    // $(".navigation-left > ul > li").mouseenter(function() {
    //   if ($(window).width() > 991) {
    //     $(this).find(".nav-dropdown").fadeIn(300);
    //
    //     $(this).mouseleave(function() {
    //       $(this).find(".nav-dropdown").hide();
    //     });
    //   }
    //
    // });
    if ($(window).width() > 991) {

      var hover = $(".navigation-left > ul > li").mouseenter(function() {

        $(".nav-dropdown").hide();
        $(".has-arrow").removeClass("has-arrow");
        $(".has-arrow").removeClass("has-arrow-colored");

        $(this).find(".nav-dropdown").fadeIn(300);

        if ($(this).find(".nav-dropdown").hasClass("three-leveled")) {
          $(this).find(">a").addClass("has-arrow-colored");
        } else {
          $(this).find(">a").addClass("has-arrow");
        }

        $(this).mouseleave(function() {
          $(this).find(".nav-dropdown").hide();
          $(this).find(">a").removeClass("has-arrow");
          $(this).find(">a").removeClass("has-arrow-colored");
        });

      });

    } else {
      $(".navigation-left > ul > li").off(hover);
    }


  };
  navDropdownHover();

  if ($(window).width() > 991) {
    $(".navigation-left > ul > li").css("position", "static");
  } else {
    $(".navigation-left > ul > li").css("position", "relative");
  }

  // nav three level tabs
  $(".three-leveled > li > a").click(function(e) {
    e.preventDefault();
    $(this).parent().siblings().find(".accordion-content:first").hide();
    $(this).parent().siblings().find(".has-arrow-down").removeClass("has-arrow-down");

    $(this).next().next().show();
    $(this).addClass("has-arrow-down");

  });

  // nav fixed on scroll
  $(document).scroll(function() {
    if ($(document).scrollTop() > 1) {
      $("header").css({
        "position": "fixed",
        "top": "0",
        "left": "0",
        "width": "100%",
        "z-index": "10000"
      });
      $("header .upper-header").hide();
    } else {
      $("header").css("position", "static");
      $("header .upper-header").show();
    }
  });

  // nav arrow position

  // function navArrowPosition() {
  //   $(".navigation-left > li").each(function() {
  //     var itemPosition = $(this).position();
  //     $(this).find(".navigation-left");
  //   });
  // }
  // $();

  // empty cart-box rendering
  function emptyCart() {
    var cartItems = $("cart-box .cart-box-article");
    if (cartItems.length === 0) {
      $(".cart-box form").hide();
      $(".empty-cart").show();
    } else {
      $(".cart-box form").show();
      $(".empty-cart").hide();
    }
  };

  // cart items number
  function cartItemNumber() {
    var cartItems = $(".cart-box .cart-box-article");

    $(".cart-number").html(cartItems.length);
  }

  cartItemNumber();

  // sliders
  $(".banner-slider").bxSlider({
    controls: true,
    nextSelector: "#banner-slider-next",
    prevSelector: "#banner-slider-prev",
    nextText: '<span class="icon-font icon-right"></span>',
    prevText: '<span class="icon-font icon-left"></span>',
    pagerCustom: "#banner-slider-pager"
  });

  $(".collection-slider").bxSlider({
    controls: true,
    nextSelector: "#collection-slider-next",
    prevSelector: "#collection-slider-prev",
    nextText: '<span class="icon-font icon-right"></span>',
    prevText: '<span class="icon-font icon-left"></span>',
    pagerCustom: "#collection-slider-pager"
  });

  // category collapse
  $(".categories").on("click", ".category-collapse", function() {

    if ($(window).width() < 768) {
      $(this).next().slideToggle();
      $(this).find(".icon-font").toggleClass("icon-light-bottom");
      $(this).find(".icon-font").toggleClass("icon-light-top");
    }

  });

  // carousel
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 1,
    responsiveClass: true,
    dots: true,
    dotsClass: "slider-dots",
    dotClass: "slider-dot",
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 1,
        dotsEach: 1
      },
      500: {
        items: 3,
        dotsEach: 3
      },
      1000: {
        items: 3,
        loop: true,
        dotsEach: 3
      }
    }
  })

  // newsletter-form invalid email
  $(".newsletter-form input[type=email]").on("invalid.bs.validator", function() {
    $(this).addClass("email-invalid");
  });

  // this event does not want to work for some reason
  $(".newsletter-form input[type=email]").on("valid.bs.validator", function() {
    $(this).removeClass("email-invalid");
  });

});
