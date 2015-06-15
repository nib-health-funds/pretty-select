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

    //initialise the input and menu to the first item in the list (if there are items)
    this.select(0);
    this.menu.focus(0);

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
    }

    return this;
  },

  onInputMouseDown: function() {
    console.log('mousedown')
    this.open();
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
    this
      .close()
      .focus()
      .menu.focus(this.selected.value) //nothing was selected so reset the focused menu item
    ;
  },

  onMenuItemFocused: function(item, i) {
    this.menu.focus(i);
  },

  onMenuItemSelected: function(item, i) {
    this.select(i).close().focus();
  }

});
