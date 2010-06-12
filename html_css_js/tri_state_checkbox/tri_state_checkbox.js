var TriStateCheckbox = function () { this.initialize.apply(this, arguments); }; TriStateCheckbox.prototype = {

  DEFAULT_OPTIONS: {
    default_value_index: 0,
    values: [ '', 'yes', 'no' ]
  },
  
  initialize: function ($root, options) {
    this.$root   = $($root);
    this.options = $.extend(true, {}, this.DEFAULT_OPTIONS, options);

    this.index   = this.options.default_value_index;
    if (this.index > 2 || this.index < 0) this.index = 0;

    this.initHTML();
    this.registerEvents();
    this.autoClass();
  },

  initHTML: function () {
    var value = this.options.values[this.index];
    this.$root.html('<input type="hidden" value="' + value + '" />');

    this.$input = this.$root.find('input');
  },

  registerEvents: function () {
    this.$root.hover((function (self) { return function () {
      self.mousein();
    }})(this), (function (self) { return function () {
      self.mouseout();
    }})(this));

    this.$root.click((function (self) { return function () {
      self.click();
    }})(this));
    this.$root.mousedown((function (self) { return function () {
      self.mousedown();
    }})(this));
    this.$root.mouseup((function (self) { return function () {
      self.mouseup();
    }})(this));
  },

  mousein: function () {
    this.hover = true;
    this.autoClass();
  },
  mouseout: function () {
    this.hover  = false;
    this.active = false;
    this.autoClass();
  },
  mousedown: function () {
    this.active = true;
    this.autoClass();
  },
  mouseup: function () {
    this.active = false;
    this.autoClass();
  },
  click: function () {
    this.index++;
    if (this.index > 2) this.index = 0;
    this.autoClass();
  },

  autoClass: function () {
    this.$root.attr('class', 'tri-state-checkbox');

    var style = 'state-' + this.index;
    if (this.active) {
      style += '-active';
    } else if (this.hover) {
      style += '-hover';
    }

    this.$root.addClass(style);
    this.$input.val(this.options.values[this.index]);
  }
};
