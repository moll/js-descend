Descend.js
==========
[![NPM version][npm-badge]](http://badge.fury.io/js/descend)
[![Build status][travis-badge]](https://travis-ci.org/moll/js-descend)
[npm-badge]: https://badge.fury.io/js/descend.png
[travis-badge]: https://travis-ci.org/moll/js-descend.png?branch=master

Descend.js gives you a simple `descend` function you can attach to constructors
or call directly to give you an inherited class (constructor with inherited
`prototype`) that calls its ancestor constructors automatically when
instantiated.

It also instantiates if any of the descendant constructors are called without
using the `new` keyword.

Descend.js also sets the `constructor` property correctly on descendants. It
does not set any other property thereby keeping your objects clean.


Installing
----------
### Installing on Node.js
```
npm install descend
```


Using
-----
### Using on constructors
Attach `descend` (or name it `inherit` or whatever you like) on a constructor:
```javascript
function Model() { console.log("Model initialized.") }
Model.descend = require("descend")

var Child = Model.descend(function() { console.log("Child initialized.") })
new Child // Will output both "Model initialized." and "Child initialized."
```

If you want descendant classes to also have the `descend` function, you might
want to add it to them afterwards:
```javascript
var descend = require("descend")
function Model() {}

Model.descend = function() {
  var descendant = descend.apply(this, arguments)
  descendant.descend = this.descend
  return descendant
}
```


### Using as a function
Call `descend` with the constructor and the descendant's initializer:
```javascript
var descend = require("descend")
function Model() { console.log("Model initialized.") }
var Child = descend(Model, function() { console.log("Child initialized.") })
new Child // Will output both "Model initialized." and "Child initialized."
```


License
-------
Descend.js is released under a *Lesser GNU Affero General Public License*, which
in summary means:

- You **can** use this program for **no cost**.
- You **can** use this program for **both personal and commercial reasons**.
- You **do not have to share your own program's code** which uses this program.
- You **have to share modifications** (e.g bug-fixes) you've made to this
  program.

For more convoluted language, see the `LICENSE` file.


About
-----
**[Andri Möll](http://themoll.com)** typed this and the code.  
[Monday Calendar](https://mondayapp.com) supported the engineering work.

If you find Descend.js needs improving, please don't hesitate to type to me now
at [andri@dot.ee][email] or [create an issue online][issues].

[email]: mailto:andri@dot.ee
[issues]: https://github.com/moll/js-descend/issues
