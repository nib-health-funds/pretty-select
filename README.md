# select

A `<select>` input written in pure HTML/JS so it can be styled nicely unlike the native ones.

## Installation 

Component:

    component install nib-health-funds/select
    
Browserify:

    npm install --save @nib-health-funds/select
    
## Usage

HTML:

    <div class="js-select">
      <div class="js-select-input" tabindex="0"></div>
      <div class="js-select-menu">
        <div data-value="c#">C#</div>
          <div data-value="go">Go</div>
          <div data-value="js">JavaScript</div>
          <div data-value="php">PHP</div>
          <div data-value="ruby">Ruby</div>
      </div>
    </div>
    
JS:

    var Select = require('select');
    var select = new Select({el: document.querySelector('.js-select')});
    
## API

### Methods

#### new Select(options)

Create a new select from an existing HTML element.

#### .focus()

Focus the select.


### Events

#### <>opened

Emitted when the select menu has finished opening.

#### <>closed

Emitted when the select menu has finished closing.