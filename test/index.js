var assert = require('assert');
var Select = require('..');

var element;

function createSelect(options) {
  options = options || {};
  var el = element = document.createElement('div');
  if (options.value) {
    el.setAttribute('data-value', options.value);
  }
  el.innerHTML = [
    '<div class="js-select-input'+(options.open ? ' is-open' : '')+'"></div>',
    '<div class="js-select-menu'+(options.open ? ' is-open' : '')+'">',
    ' <div data-value="c#">C#</div>',
    ' <div data-value="go">Go</div>',
    ' <div data-value="js">JavaScript</div>',
    ' <div data-value="php">PHP</div>',
    ' <div data-value="ruby">Ruby</div>',
    '</div>'
  ].join();
  document.body.appendChild(element);
  return new Select({el: el});
}

describe('select', function() {

  afterEach(function() {
    if (element) {
      document.body.removeChild(element);
      element = null;
    }
  });
  describe('constructor', function() {

    it('should have the first item selected', function(){

      var select = createSelect();

      assert.deepEqual(select.selected, {label: 'C#', value: 'c#'});
      assert.equal(select.el.getAttribute('data-value'), 'c#');
      assert.equal(select.input.innerHTML, 'C#');

    });

    it('should have the JavaScript item selected', function(){

      var select = createSelect({value: 'js'});

      assert.deepEqual(select.selected, {label: 'JavaScript', value: 'js'});
      assert.equal(select.el.getAttribute('data-value'), 'js');
      assert.equal(select.input.innerHTML, 'JavaScript');

    });

  });

  describe('.isOpen()', function() {

    it('should be false', function() {
      var select = createSelect();
      assert(!select.isOpen());
    });

    it('should be true', function() {
      var select = createSelect({open: true});
      assert(select.isOpen());
    });

  });

  describe('.open()', function() {

    it('should open', function() {
      var select = createSelect();
      select.open();
      assert(select.isOpen());
    });

    it('should emit opened', function(done) {
      var select = createSelect();

      select
        .on('opened', function() {
          done();
        })
        .open()
      ;

    });

  });

  describe('.close()', function() {

    it('should close', function() {
      var select = createSelect({open: true});
      select.close();
      assert(!select.isOpen());
    });

    it('should emit closed', function(done) {
      var select = createSelect({open: true});

      select
        .on('closed', function() {
          done();
        })
        .close()
      ;
    });

  });

  describe('.select()', function(){

    it('should throw an error when the value is invalid', function(done){

      var select = createSelect();

      select.on('selected', function() {
        assert(false);
      });

      select.select(null);

      assert.deepEqual(select.selected, {label: 'C#', value: 'c#'});
      assert.equal(select.el.getAttribute('data-value'), 'c#');
      assert.equal(select.input.innerHTML, 'C#');

      setTimeout(done, 250);

    });

  });

});