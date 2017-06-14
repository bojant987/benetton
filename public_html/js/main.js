$(document).ready(function() {
  "use strict";

  // popin handler
  $("body").on("click", ".popin-handler", function(e) {
    var role = $(this).attr("data-role");
    var target = $(this).attr("data-target");
    console.log(target);

    if (role === "open") {
      $(".navigation-left").removeClass("navigation-show");
      $(".login-box").removeClass("login-box-show");
      $(".cart-box").removeClass("cart-box-show");

      $("#" + target).addClass(target + "-show");

      if (target === "navigation") {
        $(".navigation-left .navigation-toggle").show();
      }

      $(".overlay").show();
    } else if (role === "close") {
      $("#" + target).removeClass(target + "-show");


      $(".navigation-left .navigation-toggle").hide();


      $(".overlay").hide();
    }
  });


  $(window).resize(function() {
    $(".navigation-left").removeClass("navigation-show");
    searchBoxPosition();
  });

  // search box position
  function searchBoxPosition() {
    var headerHeight = $("header").height();

    $(".search-box").css("top", headerHeight);
  }

  searchBoxPosition();

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

    if (target === "level2") {

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


});
