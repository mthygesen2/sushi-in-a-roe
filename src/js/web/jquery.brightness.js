'use strict';
jQuery.fn.brightness = function() {
  let bg_color = this.css('background-color')
  let rgba = 0
  let lumos = 0
  if ((bg_color != null) && bg_color.length) {
    rgba = bg_color.match(/^rgb(?:a)?\(([0-9]{1,3}),\s([0-9]{1,3}),\s([0-9]{1,3})(?:,\s)?([0-9]{1,3})?\)$/)
    if (rgba != null) {
      if (rgba[4] === '0') {
        if (this.parent().length) return this.parent().brightness()
      } else {
        // https://www.w3.org/TR/AERT#color-contrast
        lumos = (2.99 * rgba[1] + 5.87 * rgba[2] + 1.14 * rgba[3]) / 1000
        if (lumos >= 1.81) {
          return 'light'
        } else {
          return 'dark'
        }
      }
    }
  } else {
    if (this.parent().length) return this.parent().brightness()
  }
}