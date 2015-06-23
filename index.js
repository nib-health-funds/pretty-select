var View = require('view');
var Menu = require('menu');

module.exports = View.extend({

  events: {
    'mousedown .js-select-input': 'onInputMouseDown',
    'keydown .js-select-input':   'onInputKeyDown'
  },

  elements: {
    '.js-select-input': 'input'
  },

  /**
   * Initialise the select
   */
  init: function() {

    //make the input focusable if its not already
    if (this.input.tabIndex < 0) {
      this.input.tabIndex = -1;
    }

    //nothing is selected yet
    this.selected = null;

    //initialise the menu
    this.menu = new Menu({el: this.el.querySelector('.js-select-menu')});
    this.menu
      .on('opened',       this.onMenuOpened.bind(this))
      .on('closed',       this.onMenuClosed.bind(this))
      .on('cancel',       this.onMenuCancel.bind(this))
      .on('focus-item',   this.onMenuItemFocused.bind(this))
      .on('select-item',  this.onMenuItemSelected.bind(this))
    ;

    //initialise the input and menu to the selected item or the first item
    var selectedItem = this.input.getAttribute("data-value");
    if(selectedItem)
      this.select(selectedItem);
    else
      this.select(0);

  },

  isOpen: function() {
    return this.menu.isOpen();
  },

  open: function() {
    this.menu.open();
    return this;
  },

  close: function() {
    this.menu.close();
    return this;
  },

  focus: function() {
    this.input.focus();
    return this;
  },

  /**
   * Select an item by value or by index
   * @param   {string|Number} value
   * @returns {exports}
   */
  select: function(value) {
    var item = this.menu.item(value);

    if (item) {
      this.selected = item;
      this.input.innerHTML = item.label;
      this.el.setAttribute('data-value', item.value);
      this.emit('selected', item.value);
      this.menu.focus(value);
    }

    return this;
  },

  onInputMouseDown: function() {

    //open the menu if it isn't already closing
    var self = this;
    setTimeout(function() {
      if (!self.closing) self.open();
    }, 0);

  },

  onInputKeyDown: function(event) {
    var key = event.which || event.keyCode;

    if (key === 32 || key === 13) { //space or enter
      event.preventDefault();
      this.open();
    } else if (key === 27) {
      event.preventDefault();
      this.close();
    }

  },

  onMenuOpened: function() {
    this.el.classList.add('is-open');
  },

  onMenuClosed: function() {
    this.el.classList.remove('is-open');
  },

  onMenuCancel: function() {

    //stop the menu from being opened
    this.closing = true;

    this
      .close()
      .focus()
      .menu.focus(this.selected.value) //nothing was selected so reset the focused menu item
    ;

    //the menu has finished closing
    var self = this;
    setTimeout(function() {
      self.closing = false;
    }, 0);

  },

  onMenuItemFocused: function(item, i) {
    this.menu.focus(i);
  },

  onMenuItemSelected: function(item, i) {
    this.select(i).close().focus();
  }

});
