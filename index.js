module.exports = function descend(constructor, initialize) {
  "use strict"
  if (this && this !== global) initialize = constructor, constructor = this

  function Descendant() {
    if (!(this instanceof Descendant))
      return Descendant.apply(Object.create(Descendant.prototype), arguments)

    var self = constructor.apply(this, arguments) || this
    return initialize && initialize.apply(self, arguments) || self
  }

  Descendant.prototype = Object.create(constructor.prototype, {
    constructor: {value: Descendant, writable: true, configurable: true}
  })

  return Descendant
}
