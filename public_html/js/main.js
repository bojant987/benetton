$(document).ready(function() {

  //navigation collapse
  function handleMenuCollapse() {
    if ($(window).width() < 993) {
      $(".navigation-toggle").click(function(e) {
        var role = $(e.target).attr("data-role");

        $(".navigation-left").removeClass("nav-show");
        $(".navigation-left").removeClass("nav-close");

        $(".navigation-left").addClass(role);
      });
    }
  }

  handleMenuCollapse();

  $(window).resize(function() {
    handleMenuCollapse();

    if ($(window).width() > 992) {
      $(".navigation-left").removeClass("nav-show");
      $(".navigation-left").removeClass("nav-close");
    }
  });


});
