var Sinon = require("sinon")
var descend = require("..")

describe("descend", function() {
  it("must create descendant when called as function", function() {
    function Constructor() {}
    var Descendant = descend(Constructor)
    new Descendant().must.be.an.instanceof(Constructor)
    new Descendant().must.be.an.instanceof(Descendant)
  })

  it("must create descendant when called in null context", function() {
    function Constructor() {}
    var Descendant = descend.call(null, Constructor)
    new Descendant().must.be.an.instanceof(Constructor)
    new Descendant().must.be.an.instanceof(Descendant)
  })

  it("must create descendant when called in global context", function() {
    function Constructor() {}
    var Descendant = descend.call(global, Constructor)
    new Descendant().must.be.an.instanceof(Constructor)
    new Descendant().must.be.an.instanceof(Descendant)
  })

  it("must create descendant when called in constructor context", function() {
    function Constructor() {}
    var Descendant = descend.call(Constructor)
    new Descendant().must.be.an.instanceof(Constructor)
    new Descendant().must.be.an.instanceof(Descendant)
  })

  it("must call constructor when called as function", function() {
    var Constructor = Sinon.spy()
    var Descendant = descend(Constructor, function() {})
    var descendant = new Descendant(1, 2, 3)

    Constructor.callCount.must.equal(1)
    Constructor.firstCall.thisValue.must.equal(descendant)
    Constructor.firstCall.args.must.eql([1, 2, 3])
  })

  it("must call constructor when called in constructor context", function() {
    var Constructor = Sinon.spy()
    var Descendant = descend.call(Constructor, function() {})
    var descendant = new Descendant(1, 2, 3)

    Constructor.callCount.must.equal(1)
    Constructor.firstCall.thisValue.must.equal(descendant)
    Constructor.firstCall.args.must.eql([1, 2, 3])
  })

  it("must call initialize when called as function", function() {
    var initialize = Sinon.spy()
    var Descendant = descend(function() {}, initialize)
    var descendant = new Descendant(1, 2, 3)

    initialize.callCount.must.equal(1)
    initialize.firstCall.thisValue.must.equal(descendant)
    initialize.firstCall.args.must.eql([1, 2, 3])
  })

  it("must call initialize when called in constructor context", function() {
    var initialize = Sinon.spy()
    var Descendant = descend.call(function() {}, initialize)
    var descendant = new Descendant(1, 2, 3)

    initialize.callCount.must.equal(1)
    initialize.firstCall.thisValue.must.equal(descendant)
    initialize.firstCall.args.must.eql([1, 2, 3])
  })

  it("must return what constructor returns", function() {
    var obj = {}
    var Descendant = descend(function() { return obj })
    new Descendant().must.equal(obj)
  })

  it("must return what constructor returns when not overridden", function() {
    var obj = {}
    var Constructor = descend(function() { return obj })
    var Descendant = descend(Constructor, function() { return null })
    new Descendant().must.equal(obj)
  })

  it("must call initialize in context of constructor's return", function() {
    var obj = {}
    var initialize = Sinon.spy()
    var Descendant = descend(function() { return obj }, initialize)
    new Descendant(1, 2, 3)

    initialize.firstCall.thisValue.must.equal(obj)
    initialize.firstCall.args.must.eql([1, 2, 3])
  })

  describe("constructor", function() {
    it("must be set", function() {
      var Descendant = descend(function() {})
      Descendant.prototype.constructor.must.equal(Descendant)
    })

    it("must be non-enumerable", function() {
      descend(function() {}).prototype.must.have.nonenumerable("constructor")
    })

    it("must be writable", function() {
      var Descendant = descend(function() {})
      Descendant.prototype.constructor = 42
      Descendant.prototype.constructor.must.equal(42)
    })
  })
})
