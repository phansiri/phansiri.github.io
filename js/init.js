(function($){
  $(function(){

    $('.button-collapse').sideNav({
        // menuWidth: 400, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true
    });
    $('.parallax').parallax();
    $('.collapsible').collapsible();

  }); // end of document ready
})(jQuery); // end of jQuery name space