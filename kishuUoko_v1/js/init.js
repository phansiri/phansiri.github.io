(function ($) {
    'use strict';

    $(function () {

        $('.button-collapse').sideNav({
            closeOnClick: true
        });
        $('.parallax').parallax();
        $('.scrollspy').scrollSpy({
            scrollOffset: 0
        });
        $('.materialboxed').materialbox();


    }); // end of document ready
})(jQuery); // end of jQuery name space

/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});
/*Scroll to top when arrow up clicked END*/






