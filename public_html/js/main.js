$(document).ready(function() {
  "use strict";

  // hide/show loader-spinner and overlay
  function showLoader() {
    $(".loader-spinner").show();
    $(".overlay").show();
  }

  function hideLoader() {
    $(".loader-spinner").hide();
    $(".overlay").hide();
  }
  // it's shown until document fully loads
  hideLoader();

  // custom modal(havent used any bootstrap.js so might as well write this too)
  $(".open-modal").click(function(e) {
    e.preventDefault();

    var whatDoIOpen = $(this).attr("data-opens");

    openModal(whatDoIOpen);
  });

  $(".close-modal").click(function(e) {
    e.preventDefault();

    var whatDoIClose = $(this).attr("data-closes");

    closeModal(whatDoIClose);
  });

  function openModal(whatDoIOpen) {
    $(".modal-popup" + whatDoIOpen).fadeIn();
    $(".overlay").show();

    $("body").addClass("modal-open");
  };

  function closeModal(whatDoIClose) {
    $(".modal-popup" + whatDoIClose).fadeOut();
    $(".overlay").hide();

    $("body").removeClass("modal-open");
  };

  $(".modal-popup").click(function(e) {
    e.stopPropagation();
  });
  $("body").click(function(e) {
    e.stopPropagation();
    closeModal("");
  });

  // open subscribe modal after a certain time
  setTimeout(function() {
    openModal("#modal-subscribe");
  }, 15000);

  // popin handler(for nav on sm-screens and login/cart boxes)
  $("body").on("click", ".popin-handler", function(e) {
    var role = $(this).attr("data-role");
    var target = $(this).attr("data-target");

    e.preventDefault();

    if (role === "open") {
      $("html").addClass("modal-open");

      // first hide all
      $(".navigation-left").removeClass("navigation-show");
      $(".login-box").removeClass("login-box-show");
      $(".cart-box").removeClass("cart-box-show");

      // show proper one
      $("#" + target).addClass(target + "-show");

      // if it's nav, show the button for closing it
      if (target === "navigation") {
        $(".navigation-left .navigation-toggle").show();
      }

      $(".overlay-header").show();
    } else if (role === "close") {
      $("#" + target).removeClass(target + "-show");

      $(".navigation-left .navigation-toggle").hide();

      $("html").removeClass("modal-open");
      $(".overlay-header").hide();
    }
  });



  // window resize changes
  $(window).resize(function() {

    if ($(window).width() > 768) {
      $(".categories .category-list").show();
    } else {
      $(".categories .category-list").hide();
    }

    if ($(window).width() > 991) {
      // switch to hoverable dropdown
      $(".navigation-left > ul > li").css("position", "static");
      $(".navigation-left").removeClass("navigation-show");
      $(".overlay-header").hide();

      // close filter dropdown if no filter handlers are open
      if ($(".accordion-content-filters").attr("data-opened") === "all") {
        $(".accordion-content-filters").hide();
        $(".accordion-content-filters").attr("data-opened", "");
        $(".accordion-content-filters .accordion-handler-filter").hide();
        $(".show-filters").removeClass("show-mode");
        $(".filters .accordion-handler-filter").removeClass("show-mode");
      }

      $(".add-border").hide();

    } else {
      $(".navigation-left > ul > li").css("position", "relative");

      // open filter dropdown if it opened on lg screens
      if ($(".accordion-content-filters").attr("data-opened") !== "sort" && $(".accordion-content-filters").attr("data-opened") !== "") {
        $(".accordion-content-filters .accordion-handler-filter").show();
        $(".show-filters").addClass("show-mode");
        $(".border-filters").show();
        $(".border-sort").hide();
      }

      if ($(".accordion-filter-sort").is(":visible")) {
        $(".border-sort").show();
      }

    }

    // turn listener off on small screens
    navDropdownHover();

    // for customer-service pages
    asideNavHeight();
    hideAfterActive();
    hideBeforeActive();
  });

  // search box handler
  $(".search-handler").click(function(e) {
    e.preventDefault();

    $(".search-box").fadeToggle();
  });

  // classic accordion with levels
  $(".accordion-handler").click(function(e) {
    e.preventDefault();

    var target = $(this).attr("data-target");
    var currentTarget = $(this);
    var location = $(this).next().attr("data-location");

    $(this).toggleClass("show-mode");
    $(this).next().toggleClass("show-mode");

    if (target === "level3") {

      $(this).parent().siblings("li").find(".accordion-handler").removeClass("show-mode");
      $(this).parent().siblings("li").find(".accordion-handler").next().removeClass("show-mode");

      $(location + " .accordion-content").each(function() {
        if ($(this).attr("data-accordion") === "level3") {
          $(this).slideUp();
        }
      });

    } else if (target === "level2") {
      $(this).parent().siblings("li").find(".accordion-handler").removeClass("show-mode");
      $(this).parent().siblings("li").find(".accordion-handler").next().removeClass("show-mode");

      $(location + " .accordion-content").each(function() {

        if ($(this).attr("data-accordion") === "level2") {
          $(this).slideUp();
        }
      });

    } else {

      $(location + " .accordion-content").each(function() {

        $(this).slideUp();

      });

      $(location + " .accordion-handler").each(function() {
        if ($(this).get(0) !== currentTarget.get(0)) {
          $(this).removeClass("show-mode");
          $(this).next().removeClass("show-mode");
        }
      });

    }

    if ($(this).next().is(":hidden")) {
      $(this).next().slideDown();
    }

  });

  // nav dropdown on hover
  function navDropdownHover() {

    if ($(window).width() > 991) {

      var hover = $(".navigation-left > ul > li").mouseenter(function() {

        $(".nav-dropdown").hide();
        $(".has-arrow").removeClass("has-arrow");
        $(".has-arrow").removeClass("has-arrow-colored");

        $(this).find(".nav-dropdown").show();

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

  // change position to static on large screen so we can position dropdown properly
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

      $("header").addClass("fixed-header");
      $("header .upper-header").hide();

      $(".news-header").css({
        "position": "fixed",
        "top": newsHeaderPosition(),
        "left": "0",
        "width": "100%",
        "z-index": "100"
      });
      $(".news-header h1").hide();

    } else {

      $("header").removeClass("fixed-header");
      $("header .upper-header").show();

      $(".news-header").css("position", "static");
      $(".news-header h1").show();
    }
  });

  function newsHeaderPosition() {
    return $("header").height();
  }

  // empty cart rendering
  function emptyCart(location) {
    var cartItems = $(location + " " + location + "-article");
    if (cartItems.length === 0) {
      $(location + "-footer").hide();
      $(location + " .empty-cart").show();
      $(".cart .cart-wrapper > h2").hide();
    } else {
      $(location + "-footer").show();
      $(location + " .empty-cart").hide();
      $(".cart .cart-wrapper > h2").show();
    }

  };

  emptyCart(".cart-box");
  emptyCart(".cart");

  // cart items number
  function cartItemNumber() {
    var cartItems = $(".cart-box .cart-box-article");

    $(".cart-number").html(cartItems.length);
  }

  cartItemNumber();

  // remove cart-box items
  $(".cart-box .cart-remove").click(function(e) {
    e.preventDefault();
    var itemId = $(this).closest(".cart-box-article").attr("data-id");

    $(this).closest(".cart-box-article").remove();

    $(".cart .cart-article").each(function() {

      if ($(this).attr("data-id") === itemId) {
        $(this).remove();
      }

    });

    // update cart item number and check if cart is empty
    emptyCart(".cart-box");
    emptyCart(".cart");
    cartItemNumber();
  });

  // remove cart items
  $(".cart .remove").click(function(e) {
    e.preventDefault();

    var itemId = $(this).closest(".cart-article").attr("data-id");
    console.log(itemId);

    $(this).closest(".cart-article").remove();

    $(".cart-box .cart-box-article").each(function() {

      if ($(this).attr("data-id") === itemId) {
        $(this).remove();
      }

    });

    emptyCart(".cart-box");
    emptyCart(".cart");
    cartItemNumber();
  });

  // sliders

  if ($(".bxslider").length > 0) {
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

    $(".single-product-slider").bxSlider({
      controls: true,
      nextSelector: "#single-product-slider-next",
      prevSelector: "#single-product-slider-prev",
      nextText: '<span class="icon-font icon-right"></span>',
      prevText: '<span class="icon-font icon-left"></span>',
      pagerCustom: $(window).width() > 768 ? "#bx-pager" : "#product-slider-pager",
    });

  }

  // category collapse
  $(".categories").on("click", ".category-collapse", function() {

    if ($(window).width() < 768) {
      $(this).next().slideToggle();
      $(this).find(".icon-font").toggleClass("icon-light-bottom");
      $(this).find(".icon-font").toggleClass("icon-light-top");
    }

  });

  // carousel
  if ($(".owl-carousel").length > 0) {

    $(".most-wanted-carousel").owlCarousel({
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
          dotsEach: 3,
          nav: true
        }
      }
    });

    $(".recommendations-carousel").owlCarousel({
      loop: true,
      margin: 30,
      responsiveClass: true,
      dots: true,
      dotsClass: "slider-dots",
      dotClass: "slider-dot",
      nav: true,
      navContainerClass: "carousel-nav-container",
      navClass: "carousel-nav",
      navText: ['<span class="icon-font icon-light-left prev"></span>', '<span class="icon-font icon-light-right next"></span>'],
      autoplay: true,
      autoplayTimeout: 5000,
      responsive: {
        0: {
          items: 1,
          dotsEach: 1
        },
        600: {
          items: 3,
          dotsEach: 3,
          margin: 10
        },
        1000: {
          items: 3,
          loop: true,
          dotsEach: 3
        },
        1300: {
          items: 3,
          loop: true,
          dotsEach: 3,
        }
      }
    });

  }

  // newsletter-form invalid email
  $(".newsletter-form input[type=email]").on("invalid.bs.validator", function() {
    $(this).addClass("email-invalid");
  });

  // this event refuses to work for some reason
  $(".newsletter-form input[type=email]").on("valid.bs.validator", function() {
    $(this).removeClass("email-invalid");
  });


  // swap img on product hover (needs IE fix)
  $(".product .upper, .recommendations .item").mouseenter(function() {
    var orgSrc = $(this).find("img").attr("src");
    var hoverSrc = orgSrc.replace(".", "-hov.");

    // IE fix
    var ms_ie = false;
    var ua = window.navigator.userAgent;
    var old_ie = ua.indexOf('MSIE ');
    var new_ie = ua.indexOf('Trident/');

    if ((old_ie > -1) || (new_ie > -1)) {
      ms_ie = true;
    }

    if (ms_ie) {

      $(this).find("img").attr("src", hoverSrc);

    } else {
      $(this).find("img").attr("src", hoverSrc);
    }



    $(this).mouseleave(function functionName() {
      if (ms_ie) {

        $(this).find("img").attr("src", orgSrc);
      } else {
        $(this).find("img").attr("src", orgSrc);
      }
    });

  });

  // addto-wishlist hover
  $(".product .wishlist-handler").mouseenter(function() {

    if ($(this).attr("data-role") === "add") {

      $(this).find(".icon-wishlist_outline").css("display", "none");
      $(this).find(".icon-wishlist").css("display", "block");

      $(this).find(".add").show();

    } else if ($(this).attr("data-role") === "remove") {

      $(this).find(".remove").show();

    }

  });

  $(".product .wishlist-handler").mouseleave(function() {

    if ($(this).attr("data-role") === "add") {

      $(this).find(".icon-wishlist_outline").css("display", "block");
      $(this).find(".icon-wishlist").css("display", "none");

      $(this).find(".pop-over").hide();

    } else if ($(this).attr("data-role") === "remove") {

      $(this).find(".pop-over").hide();

    }

  });

  // add/remove from wishlist
  $(".wishlist-handler").click(function(e) {
    e.preventDefault();
    var item = $(this).parent().parent().siblings(".lower").find(".name").text();

    if ($(this).attr("data-role") === "add") {

      $(this).find(".icon-wishlist_outline").css("display", "none");
      $(this).find(".icon-wishlist").css("display", "block");
      $(this).find(".add").hide();
      $(this).find(".remove").show();
      $(this).attr("data-role", "remove");

      $(".added-removed").html(item + " has been added to your wishlist");
      showAddedRemoved();

    } else if ($(this).attr("data-role") === "remove") {

      $(this).find(".remove").hide();
      $(this).find(".add").show();
      $(this).attr("data-role", "add");

      $(".added-removed").html(item + " has been removed from your wishlist");
      showAddedRemoved();

    }

  });

  // show added-removed( simple message that item has been added or removed )
  function showAddedRemoved() {
    $(".added-removed").fadeIn();

    setTimeout(function functionName() {
      $(".added-removed").fadeOut();
    }, 2000);
  }

  // cross product original price if discount exists
  $(".prices").each(function() {
    if ($(this).find(".price-discount").html() !== "" && $(this).find(".price-discount").html() !== undefined) {
      $(this).find(".price-original").css("text-decoration", "line-through");
    }
  });

  // back to top button
  $(document).scroll(function() {

    if ($(document).scrollTop() > 1200) {
      $(".back-to-top").fadeIn();
    } else {
      $(".back-to-top").fadeOut();
    }

  });

  $(".back-to-top").click(function(e) {
    e.preventDefault();

    $("html, body").animate({
      scrollTop: 0
    }, 800);

  });

  // fake checkboxes
  $(".accordion-content-filters, .register-form, .contact-us-form").on("change", "input[type=checkbox]", function() {

    if ($(this).is(":checked")) {
      $(this).next().addClass("checked");
    } else {
      $(this).next().removeClass("checked");
    }
    // for filter checkboxes
    renderButton();

  });

  // render apply or close button for filters
  function renderButton() {
    var counter = 0;

    $(".accordion-content-filters input[type=checkbox]").each(function() {
      if ($(this).is(":checked")) {
        counter++;
      }
    });

    if (counter === 0) {
      $(".accordion-content-filters .apply-btn").hide();
      $(".accordion-content-filters .close-btn").show();
    } else {
      $(".accordion-content-filters .close-btn").hide();
      $(".accordion-content-filters .apply-btn").show();
    }

  };

  // show all filters on small screens
  $(".filters .show-filters").click(function() {
    var target = $(this).attr("data-target");

    $(".accordion-filter-sort").hide();
    $(".sort .accordion-handler-filter").removeClass("show-mode");
    $(".border-sort").hide();
    $(".border-filters").toggle();

    if ($(".accordion-content-filters").attr("data-opened") !== "sort") {
      $(".accordion-content-filters").toggle();
    }

    $(".accordion-content-filters .accordion-handler-filter").toggle();
    $(this).toggleClass("show-mode");

    if ($(".accordion-content-filters").is(":hidden")) {
      $(".accordion-content-filters").attr("data-opened", "");
    } else {
      $(".accordion-content-filters").attr("data-opened", target);
    }

    renderButton();

  });

  // filter dropdown on small screens(<992px)
  $(".accordion-content-filters .accordion-handler-filter").click(function() {
    var target = $(this).attr("data-target");
    var clicked = $(this);

    if ($(this).next().is(":visible")) {
      $(".accordion-content-filters").attr("data-opened", "all");
    } else {
      $(".accordion-content-filters").attr("data-opened", target);
    }

    $(".accordion-content-filters .accordion-handler-filter").each(function() {
      if (!$(this).is(clicked)) {
        $(this).removeClass("show-mode");
        $(this).next().slideUp();
      }
    });
    $(this).next().slideToggle();
    $(this).toggleClass("show-mode");


    // if someone decides to resize the screen
    $(".filters .accordion-handler-filter").each(function() {
      if ($(this).attr("data-target") === target) {
        $(this).toggleClass("show-mode");
      } else {
        $(this).removeClass("show-mode");
      }
    });


  });

  // filter dropdown on large screens(>991px)
  $(".filters .accordion-handler-filter").click(function() {
    var clicked = $(this);
    var target = $(this).attr("data-target");

    if ($(".accordion-content-filters").attr("data-opened") === target) {
      $(".accordion-content-filters").hide();
      $(".accordion-content-filters").attr("data-opened", "");
    } else {
      $(".accordion-content-filters").show();
      $(".accordion-content-filters").attr("data-opened", target);
    }

    $(".filters .accordion-handler-filter").each(function() {
      if (!$(this).is(clicked)) {
        $(this).removeClass("show-mode");
      }
    });

    $(this).toggleClass("show-mode");

    $(".accordion-content-filters .accordion-filter").each(function functionName() {
      if ($(this).attr("data-filter") === target) {
        $(this).toggle();
      } else {
        $(this).hide();
      }
    });

    $(".sort .accordion-handler-filter").removeClass("show-mode");
    $(".sort .accordion-handler-filter").next().hide();

    // if someone decides to resize the screen
    $(".accordion-content-filters .accordion-handler-filter").each(function() {
      if ($(this).attr("data-target") === target) {
        $(this).toggleClass("show-mode");
      } else {
        $(this).removeClass("show-mode");
      }
    });

  });

  // sort filter dropdown
  $(".sort .accordion-handler-filter").click(function() {
    var target = $(this).attr("data-target");

    if ($(window).width() < 992) {
      $(".border-filters").hide();
      $(".border-sort").toggle();
    }

    $(".accordion-content-filters .accordion-handler-filter").hide();
    $(".accordion-content-filters .accordion-filter").hide();
    $(".accordion-content-filters .accordion-handler-filter").removeClass("show-mode");
    $(".filters .show-filters").removeClass("show-mode");


    // close .filters
    $(".accordion-content-filters").hide();
    $(".accordion-content-filters .accordion-filter").hide();
    $(".accordion-content-filters").attr("data-opened", "");
    $(".filters .accordion-handler-filter").removeClass("show-mode");

    $(this).toggleClass("show-mode");
    $(this).next().toggle();

  });

  if ($(window).width() < 992) {
    $(".sort-by").text("Sort by");
  }

  // sort dropdown list
  $(".sort, .accordion-filter-sort").on("click", "a", function(e) {
    e.preventDefault();
    var sortBy = $(this).text();

    $(".sort-by").text(sortBy);
    $(this).parent().parent().hide();
    $(".sort-by").parent().removeClass("show-mode");
    $(".accordion-content-filters").hide();
    $(".add-border").hide();

    // make the text fit on 320px
    if ($(window).width() < 400) {
      $(".sort-by").css("font-size", "11px");
      $(".sort .accordion-handler-filter").css("padding-left", "0");
    }


  });

  // close button for filters
  $(".accordion-content-filters .close-btn").click(function() {
    var opened = $(".accordion-content-filters").attr("data-opened", "");

    $(".accordion-content-filters .accordion-filter").hide();
    $(".accordion-content-filters").hide();
    $(".accordion-content-filters").attr("data-opened", "");
    $(".accordion-handler-filter").removeClass("show-mode");

    $(".filters .show-filters").removeClass("show-mode");
    $(".accordion-content-filters .accordion-handler-filter").hide();
  });

  // apply button for filters
  $(".accordion-content-filters .apply-btn").click(function() {

    $(".accordion-content-filters input[type=checkbox]").each(function() {
      var id = $(this).attr("id");

      if ($(this).is(":checked") && $("." + id + "-applied").length === 0) {

        var text = $(this).siblings(".label").text();
        var category = $(this).closest(".accordion-filter").attr("data-filter");

        var html = '<article class="single-filter ' + id + '-applied' + '">' +
          '<span class="icon-font icon-close remove-filter"></span>' +
          '<span><span class="filter-category text-capitalize">' + category +
          '</span><span class="text-capitalize">' + text +
          '</span></span>' +
          '</article>';

        $(".filters-applied .current-filters").prepend(html);

        // show filters-applied bar since now a filter is applied
        checkIfFiltersExist();

      }
      // empty checkboxes after you apply filters
      $(this).prop("checked", false);
      $(this).next().removeClass("checked");

    });

    $(".accordion-content-filters").find(".accordion-filter").hide();
    $(".accordion-content-filters").hide();
    $(".accordion-content-filters").attr("data-opened", "");
    $(".accordion-handler-filter").removeClass("show-mode");

    $(".filters .show-filters").removeClass("show-mode");
    $(".accordion-content-filters .accordion-handler-filter").hide();

    renderButton();

  });

  // remove filter
  $(".filters-applied").on("click", ".remove-filter", function() {
    $(this).parent().remove();

    checkIfFiltersExist();
  });

  // remove all filters
  $(".filters-applied .clear").click(function() {
    $(".filters-applied .current-filters").html("");

    checkIfFiltersExist();
  });

  // show filters-applied bar if filter is applied or hide if it's not
  function checkIfFiltersExist() {
    if ($(".filters-applied .current-filters .single-filter").length === 0) {
      $(".filters-applied").hide();
    } else {
      $(".filters-applied").show();
    }
  }

  // close cookies bar
  $(".cookies-bar .button-cookies").click(function(e) {
    e.preventDefault();
    $(this).parent().hide();
  });

  // fake radio
  $(".fake-radio").click(function() {
    var target = $(this);

    $(this).prev().prop("checked", true);
    $(".single-product-form .submit-btn").addClass("something-picked");
    $(".single-product-form .submit-btn").html("add to cart");

    $(this).siblings(".fake-radio").each(function() {
      if (!$(this).is(target)) {
        $(this).removeClass("picked");
      }
    });
    $(".single-product-form").validator("validate");
    $(this).addClass("picked");
  });

  $(".single-product-form input[type=radio]").each(function() {
    $(this).prop("checked", false);
  });

  // open share links
  $(".open-share").click(function(e) {
    e.preventDefault();

    $(".share-links").show();
    setTimeout(function() {
      $(".share-links").hide();
    }, 5000);
  });

  // aside nav height
  function asideNavHeight() {

    if ($(window).width() > 767) {
      $(".customer-service-nav").each(function() {
        var height = $(this).next().innerHeight();

        $(this).innerHeight(height);
      });
    } else {
      $(".customer-service-nav").css("height", "auto");
    }
  }
  asideNavHeight();

  // hide customer-service-nav links after active on aside
  function hideAfterActive() {
    if ($(window).width() < 768) {
      var index;
      $(".aside-nav ul li").each(function() {
        if ($(this).hasClass("active")) {
          index = $(this).index();
        }
      });

      $(".aside-nav ul li:gt(" + index + ")").css("display", "none");
    } else {
      $(".aside-nav ul li").css("display", "block");
    }
  };
  hideAfterActive();

  // hide customer-service-nav links before active on bottom on mobile screens
  function hideBeforeActive() {
    if ($(window).width() < 768) {
      var index;
      $(".mobile-nav ul li").each(function() {
        if ($(this).hasClass("active")) {
          index = $(this).index();
        }
      });

      $(".mobile-nav ul li:lt(" + index + ")").css("display", "none");
    }
  };
  hideBeforeActive();

});

// cart-box-form apply coupon btn expanding on input focus
$(".cart-box-form input").focus(function() {
  $(".cart-box-form button .text").show();
});
