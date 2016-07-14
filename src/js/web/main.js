'use strict';
/**
 * Global JavaScript for the site wrapped in jQuery
 */
(function($) {
  // Determines the brightness of the background color and then returns a
  // black/white value for the text color.
  function getTextColor() {
    switch ($('body').brightness()) {
      case 'light':
        return 'black'
      case 'dark':
        return 'white'
      default:
        return 'black'
    }
  }

  let footer = $('#footer')
  footer.css('color', getTextColor())
  footer.find('.nav-links li').css('border-color', getTextColor())
  footer.find('ul li a').css('color', getTextColor())

})(jQuery);