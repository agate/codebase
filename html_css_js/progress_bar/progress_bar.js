/**
 *  options:
 *    color: progressBar's background color
 *    width: progressBar's width
 *
 *  manual:
 *    var p = new ProgressBar(selector);
 *    p.setPercent(23);
 */

var ProgressBar = function () { this.initialize.apply(this, arguments); }; ProgressBar.prototype = {
  DEFAULT_COLOR: "blue",
  DEFAULT_WIDTH: 200,

  initialize: function (jq, options) {
    this.jq      = jq;
    this.options = options || {};

    this.initHTML();
  },

  initHTML: function () {
    this.jq.html('<div class="progressBar"><div class="bar" /><div class="textContainer">0%</div></div>');

    this.jqBorder = this.jq.find('.progressBar:first');
    this.jqBar    = this.jq.find('.bar:first');
    this.jqText   = this.jq.find('.textContainer');

    var color = this.options.color || this.DEFAULT_COLOR;
    var width = this.options.width || this.DEFAULT_WIDTH;

    this.setColor(color);
    this.setWidth(width);
  },
  
  setColor: function (color) {
    this.color = color;
    this.jqBorder.css('border-color', color);
    this.jqBar.css('background-color', color);
  },

  setWidth: function (width) {
    this.width = width;
    this.jqBorder.width(width);
    this.jqText.css('left', width + 10);
  },

  setPercent: function (percent) {
    var width = percent * (this.width - 2) / 100;
    this.jqBar.width(width);
    this.jqText.html(percent + '%');
  }
};
