$(document).ready(function() {
  "use strict";

  // popin handler
  $("body").on("click", ".popin-handler", function(e) {
    var role = $(this).attr("data-role");
    var target = $(this).attr("data-target");
    e.preventDefault();
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

    if ($(window).width() > 991) {
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
    asideNavHeight();
    hideAfterActive();
    hideBeforeActive();
  });

  // on scroll position updates
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

  // classic accordion
  $(".accordion-handler").click(function(e) {
    e.preventDefault();

    var target = $(this).attr("data-target");
    var currentTarget = $(this);
    var location = $(this).next().attr("data-location");

    $(this).toggleClass("show-mode");

    if (target === "level3") {

      $(this).parent().siblings("li").find(".accordion-handler").removeClass("show-mode");

      $(location + " .accordion-content").each(function() {
        if ($(this).attr("data-accordion") === "level3") {
          $(this).slideUp();
        }
      });

    } else if (target === "level2") {
      $(this).parent().siblings("li").find(".accordion-handler").removeClass("show-mode");

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

  function getProperPager() {
    return $(window).width() > 768 ? "#bx-pager" : "#product-slider-pager";
  }

  console.log(getProperPager());
  $(".single-product-slider").bxSlider({
    controls: true,
    nextSelector: "#single-product-slider-next",
    prevSelector: "#single-product-slider-prev",
    nextText: '<span class="icon-font icon-right"></span>',
    prevText: '<span class="icon-font icon-left"></span>',
    pagerCustom: getProperPager()
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


  // swap img on product hover
  $(".product .upper").mouseenter(function() {
    var orgSrc = $(this).find("img").attr("src");
    var hoverSrc = orgSrc.replace(".jpg", "-hov.jpg");

    $(this).find("img").attr("src", hoverSrc);

    $(this).mouseleave(function functionName() {
      $(this).find("img").attr("src", orgSrc);
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

  // show added-removed
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

  // filter fake checkboxes
  $(".accordion-content-filters, .register-form, .contact-us-form").on("change", "input[type=checkbox]", function() {

    if ($(this).is(":checked")) {
      $(this).next().addClass("checked");
    } else {
      $(this).next().removeClass("checked");
    }

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

    if ($(".accordion-content-filters").attr("data-opened") === "sort" && $(window).width() < 992) {
      $(".accordion-content-filters .apply-btn").hide();
      $(".accordion-content-filters .close-btn").hide();
    } else {

      if (counter === 0) {
        $(".accordion-content-filters .apply-btn").hide();
        $(".accordion-content-filters .close-btn").show();
      } else {
        $(".accordion-content-filters .close-btn").hide();
        $(".accordion-content-filters .apply-btn").show();
      }

    }

  };

  // show all filters on small screens
  $(".filters .show-filters").click(function() {
    var target = $(this).attr("data-target");

    $(".accordion-filter-sort").hide();
    $(".sort .accordion-handler-filter").removeClass("show-mode");

    if ($(".accordion-content-filters").attr("data-opened") === target || $(".accordion-content-filters").attr("data-opened") === "") {
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

    // $(".products-filter-top-level > .container > .row > .col-xs-6:nth-of-type(2)").toggleClass("add-border");


  });

  // filter dropdown on small screens(<992px)
  $(".accordion-content-filters .accordion-handler-filter").click(function() {
    var target = $(this).attr("data-target");
    var clicked = $(this);

    $(".accordion-content-filters .accordion-handler-filter").each(function() {
      if (!$(this).is(clicked)) {
        $(this).removeClass("show-mode");
        $(this).next().slideUp();
      }
    });
    $(this).next().slideToggle();
    $(this).toggleClass("show-mode");


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



  });

  // sort filter dropdown
  $(".sort .accordion-handler-filter").click(function() {
    var target = $(this).attr("data-target");

    if ($(window).width() < 992) {

      $(".accordion-content-filters .accordion-handler-filter").hide();
      $(".accordion-content-filters .accordion-filter").hide();
      $(".accordion-content-filters .accordion-handler-filter").removeClass("show-mode");
      $(".filters .show-filters").removeClass("show-mode");

      if ($(".accordion-content-filters").attr("data-opened") === target || $(".accordion-content-filters").attr("data-opened") === "") {
        $(".accordion-content-filters").toggle();
      }

      $(".accordion-content-filters .accordion-filter-sort").toggle();

      if ($(".accordion-content-filters").is(":hidden")) {
        $(".accordion-content-filters").attr("data-opened", "");
      } else {
        $(".accordion-content-filters").attr("data-opened", target);
      }

      renderButton();

    } else {

      if ($(".accordion-content-filters").is(":hidden")) {
        $(".accordion-content-filters").attr("data-opened", "");
      } else {
        $(".accordion-content-filters").attr("data-opened", target);
      }



      // close .filters
      $(".accordion-content-filters").hide();
      $(".accordion-content-filters .accordion-filter").hide();
      $(".accordion-content-filters").attr("data-opened", "");
      $(".filters .accordion-handler-filter").removeClass("show-mode");

    }

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

        var singleFilter = $("<article></article>");
        var removeFilter = $("<span></span>");
        var outerSpan = $("<span></span>");
        var filterCategory = $("<span></span>");
        var textHere = $("<span></span>");

        singleFilter.addClass("single-filter");
        singleFilter.addClass(text + "-applied");
        removeFilter.addClass("icon-font icon-close remove-filter");
        filterCategory.addClass("filter-category text-capitalize");
        textHere.addClass("text-capitalize");

        textHere.text(text);
        filterCategory.text(category + ": ");

        outerSpan.prepend(filterCategory);
        outerSpan.append(textHere);

        singleFilter.prepend(removeFilter);
        singleFilter.append(outerSpan);

        $(".current-filters").prepend(singleFilter);
        checkIfFiltersExist();

      }


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
    var filter = $(this).next().find("span:last").text();

    $(".accordion-content-filters input[type=checkbox]").each(function() {
      if ($(this).siblings(".label").text() === filter) {
        $(this).prop("checked", false);
        $(this).next().removeClass("checked");
      }
    });

    renderButton();
    checkIfFiltersExist();
  });

  // remove all filters
  $(".filters-applied .clear").click(function() {
    $(".filters-applied .current-filters").html("");

    $(".accordion-content-filters input[type=checkbox]").each(function() {
      $(this).prop("checked", false);
      $(this).next().removeClass("checked");
    });

    checkIfFiltersExist();
  });

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
