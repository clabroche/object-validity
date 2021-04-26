const {expect} = require('chai')
const ValidationError = require('./Errors/ValidationError')
const Validation = require('./Validation.js')

describe('Validation', function() {
  it('All exported functions should be valid', function() {
    Object.keys(Validation).forEach(key => {
      const validationFunction = Validation[key]
      expect(validationFunction).to.be.a('function')
      const returnFunction = validationFunction()
      expect(returnFunction).to.be.instanceOf(Validation)
    })
  })
  describe('#min', function() {
    it('should not validate when value > min', function() {
      expect(_ => new Validation(3).min(5)).to.throw(ValidationError)
    })
    it('should validate when value < min', function() {
      expect(_ => new Validation(5).min(3)).to.not.throw(ValidationError)
    })
  })
  describe('#max', function() {
    it('should not validate when value > max', function() {
      expect(_ => new Validation(5).max(3)).to.throw(ValidationError)
    })
    it('should validate when value < max', function() {
      expect(_ => new Validation(3).max()).to.not.throw(ValidationError)
    })
  })
  describe('#between', function() {
    it('should validate when min < value < max', function() {
      expect(_ => new Validation(4).between(3, 5)).to.not.throw(ValidationError)
    })
    it('should not validate when value < min < max', function() {
      expect(_ => new Validation(2).between(3, 5)).to.throw(ValidationError)
    })
    it('should not validate when min < max < value', function() {
      expect(_ => new Validation(2).between(3, 5)).to.throw(ValidationError)
    })
  })
  describe('#number', function() {
    it('a number should be a number', function() {
      expect(_ => new Validation(5).number()).to.not.throw(ValidationError)
    })
    it('should throw an error if no number value is provided', function() {
      expect(_ => new Validation('5').number()).to.throw(ValidationError)
      expect(_ => new Validation({}).number()).to.throw(ValidationError)
      expect(_ => new Validation([]).number()).to.throw(ValidationError)
      expect(_ => new Validation(null).number()).to.throw(ValidationError)
      expect(_ => new Validation(undefined).number()).to.throw(ValidationError)
      expect(_ => new Validation(true).number()).to.throw(ValidationError)
    })
  })
  describe('#string', function() {
    it('a string should be a string', function() {
      expect(_ => new Validation('').string()).to.not.throw(ValidationError)
    })
    it('should throw an error if no string value is provided', function() {
      expect(_ => new Validation(5).string()).to.throw(ValidationError)
      expect(_ => new Validation({}).string()).to.throw(ValidationError)
      expect(_ => new Validation([]).string()).to.throw(ValidationError)
      expect(_ => new Validation(null).string()).to.throw(ValidationError)
      expect(_ => new Validation(undefined).string()).to.throw(ValidationError)
      expect(_ => new Validation(true).string()).to.throw(ValidationError)
    })
  })
  describe('#array', function() {
    it('an array should be an array', function() {
      expect(_ => new Validation([]).array()).to.not.throw(ValidationError)
    })
    it('should throw an error if no array value is provided', function() {
      expect(_ => new Validation('5').array()).to.throw(ValidationError)
      expect(_ => new Validation(5).array()).to.throw(ValidationError)
      expect(_ => new Validation({}).array()).to.throw(ValidationError)
      expect(_ => new Validation(null).array()).to.throw(ValidationError)
      expect(_ => new Validation(undefined).array()).to.throw(ValidationError)
      expect(_ => new Validation(true).array()).to.throw(ValidationError)
    })
  })

  describe('#lengthOf', function() {
    it('an array with length 2 should be valid', function() {
      expect(_ => new Validation([1, 2]).lengthOf(2)).to.not.throw(ValidationError)
    })
    it('a string length 2 should be valid', function() {
      expect(_ => new Validation('12').lengthOf(2)).to.not.throw(ValidationError)
    })
    it('an array like with length 2 should be valid', function() {
      expect(_ => new Validation({length: 2}).lengthOf(2)).to.not.throw(ValidationError)
    })
    it('should not be valid', function() {
      expect(_ => new Validation('5').lengthOf(2)).to.throw(ValidationError)
      expect(_ => new Validation(5).lengthOf(2)).to.throw(ValidationError)
      expect(_ => new Validation({}).lengthOf(2)).to.throw(ValidationError)
      expect(_ => new Validation(null).lengthOf(2)).to.throw(ValidationError)
      expect(_ => new Validation(undefined).lengthOf(2)).to.throw(ValidationError)
      expect(_ => new Validation(true).lengthOf(2)).to.throw(ValidationError)
    })
  })

  describe('#object', function() {
    it('an object should be an object', function() {
      expect(_ => new Validation({}).object()).to.not.throw(ValidationError)
    })
    it('should throw an error if no object value is provided', function() {
      expect(_ => new Validation('5').object()).to.throw(ValidationError)
      expect(_ => new Validation(5).object()).to.throw(ValidationError)
      expect(_ => new Validation([]).object()).to.throw(ValidationError)
      expect(_ => new Validation(null).object()).to.throw(ValidationError)
      expect(_ => new Validation(undefined).object()).to.throw(ValidationError)
      expect(_ => new Validation(true).object()).to.throw(ValidationError)
    })
  })
  describe('#boolean', function() {
    it('a boolean should be a boolean', function() {
      expect(_ => new Validation(true).boolean()).to.not.throw(ValidationError)
      expect(_ => new Validation(false).boolean()).to.not.throw(ValidationError)
    })
    it('should throw a error if no boolean value is provided', function() {
      expect(_ => new Validation('5').boolean()).to.throw(ValidationError)
      expect(_ => new Validation(5).boolean()).to.throw(ValidationError)
      expect(_ => new Validation({}).boolean()).to.throw(ValidationError)
      expect(_ => new Validation([]).boolean()).to.throw(ValidationError)
      expect(_ => new Validation(null).boolean()).to.throw(ValidationError)
      expect(_ => new Validation(undefined).boolean()).to.throw(ValidationError)
    })
  })
  describe('#toBeTruthy', function() {
    it('should not throw an error on true boolean', function() {
      expect(_ => new Validation(true).toBeTruthy()).to.not.throw(ValidationError)
    })
    it('should throw a error if no toBeTruthy value is provided', function() {
      expect(_ => new Validation('5').toBeTruthy()).to.throw(ValidationError)
      expect(_ => new Validation(5).toBeTruthy()).to.throw(ValidationError)
      expect(_ => new Validation(false).toBeTruthy()).to.throw(ValidationError)
      expect(_ => new Validation({}).toBeTruthy()).to.throw(ValidationError)
      expect(_ => new Validation([]).toBeTruthy()).to.throw(ValidationError)
      expect(_ => new Validation(null).toBeTruthy()).to.throw(ValidationError)
      expect(_ => new Validation(undefined).toBeTruthy()).to.throw(ValidationError)
    })
  })
  describe('#toBeFalsy', function() {
    it('should not throw an error on true boolean', function() {
      expect(_ => new Validation(false).toBeFalsy()).to.not.throw(ValidationError)
    })
    it('should throw a error if no toBeFalsy value is provided', function() {
      expect(_ => new Validation('5').toBeFalsy()).to.throw(ValidationError)
      expect(_ => new Validation(5).toBeFalsy()).to.throw(ValidationError)
      expect(_ => new Validation(true).toBeFalsy()).to.throw(ValidationError)
      expect(_ => new Validation({}).toBeFalsy()).to.throw(ValidationError)
      expect(_ => new Validation([]).toBeFalsy()).to.throw(ValidationError)
      expect(_ => new Validation(null).toBeFalsy()).to.throw(ValidationError)
      expect(_ => new Validation(undefined).toBeFalsy()).to.throw(ValidationError)
    })
  })
  describe('#be', function() {
    it('should not throw error if type of value is correct', function() {
      expect(_ => new Validation([]).be('array')).to.not.throw(ValidationError)
      expect(_ => new Validation({}).be('object')).to.not.throw(ValidationError)
      expect(_ => new Validation('').be('string')).to.not.throw(ValidationError)
      expect(_ => new Validation(2).be('number')).to.not.throw(ValidationError)
      expect(_ => new Validation(true).be('boolean')).to.not.throw(ValidationError)
      expect(_ => new Validation('12').be(['string', 'object'])).to.not.throw(ValidationError)
      expect(_ => new Validation({}).be(['string', 'object'])).to.not.throw(ValidationError)
    })
    it('should throw an error if array ', function() {
      expect(_ => new Validation([]).be('number')).to.throw(ValidationError)
      expect(_ => new Validation([]).be('string')).to.throw(ValidationError)
      expect(_ => new Validation([]).be('object')).to.throw(ValidationError)
      expect(_ => new Validation([]).be('boolean')).to.throw(ValidationError)
      expect(_ => new Validation(12).be(['boolean', 'object'])).to.throw(ValidationError)
      expect(_ => new Validation('12').be(['boolean', 'object'])).to.throw(ValidationError)
    })
  })
  describe('#notNull', function() {
    it('should throw an error if null is provided', function() {
      expect(_ => new Validation(null).notNull()).to.throw(ValidationError)
    })
    it('should not throw an error if null is not provided', function() {
      expect(_ => new Validation([]).notNull()).to.not.throw(ValidationError)
      expect(_ => new Validation({}).notNull()).to.not.throw(ValidationError)
      expect(_ => new Validation('').notNull()).to.not.throw(ValidationError)
      expect(_ => new Validation(2).notNull()).to.not.throw(ValidationError)
      expect(_ => new Validation(true).notNull()).to.not.throw(ValidationError)
      expect(_ => new Validation(undefined).notNull()).to.not.throw(ValidationError)
    })
  })
  describe('#null', function() {
    it('should not throw an error if null is provided', function() {
      expect(_ => new Validation(null).null()).to.not.throw(ValidationError)
    })
    it('should throw an error if null is not provided', function() {
      expect(_ => new Validation([]).null()).to.throw(ValidationError)
      expect(_ => new Validation({}).null()).to.throw(ValidationError)
      expect(_ => new Validation('').null()).to.throw(ValidationError)
      expect(_ => new Validation(2).null()).to.throw(ValidationError)
      expect(_ => new Validation(true).null()).to.throw(ValidationError)
      expect(_ => new Validation(undefined).null()).to.throw(ValidationError)
    })
  })
  describe('#equal', function() {
    it('should pass test equal with string', function() {
      expect(_ => new Validation('test').equal('test')).to.not.throw(ValidationError)
      expect(_ => new Validation('test').equal('hey', 'test', 'ho')).to.not.throw(ValidationError)
    })
    it('should pass test equal with number', function() {
      expect(_ => new Validation(2).equal(2)).to.not.throw(ValidationError)
      expect(_ => new Validation(2).equal('hey', 2, 'ho')).to.not.throw(ValidationError)
    })
    it('should pass test equal with boolean', function() {
      expect(_ => new Validation(true).equal(true)).to.not.throw(ValidationError)
      expect(_ => new Validation(true).equal('hey', true, 'ho')).to.not.throw(ValidationError)
      expect(_ => new Validation(true).equal('hey', true, 'ho')).to.not.throw(ValidationError)
      expect(_ => new Validation(false).equal(false)).to.not.throw(ValidationError)
      expect(_ => new Validation(false).equal('hey', false, 'ho')).to.not.throw(ValidationError)
      expect(_ => new Validation(false).equal('hey', false, 'ho')).to.not.throw(ValidationError)
    })
    it('should pass test equal with object', function() {
      const object = {}
      expect(_ => new Validation(object).equal(object)).to.not.throw(ValidationError)
      expect(_ => new Validation(object).equal('hey', object, 'ho')).to.not.throw(ValidationError)
      expect(_ => new Validation(object).equal('hey', object, 'ho')).to.not.throw(ValidationError)
    })

    it('should not pass test equal with string', function() {
      expect(_ => new Validation('test').equal('tes')).to.throw(ValidationError)
      expect(_ => new Validation('test').equal('hey', 'ho')).to.throw(ValidationError)
    })
    it('should not pass test equal with number', function() {
      expect(_ => new Validation(2).equal(3)).to.throw(ValidationError)
      expect(_ => new Validation(2).equal(3, 'ho')).to.throw(ValidationError)
    })
    it('should not pass test equal with boolean', function() {
      expect(_ => new Validation(true).equal(false)).to.throw(ValidationError)
      expect(_ => new Validation(true).equal('hey', false, 'ho')).to.throw(ValidationError)
      expect(_ => new Validation(true).equal('hey', false, 'ho')).to.throw(ValidationError)
      expect(_ => new Validation(false).equal(true)).to.throw(ValidationError)
      expect(_ => new Validation(false).equal('hey', true, 'ho')).to.throw(ValidationError)
      expect(_ => new Validation(false).equal('hey', true, 'ho')).to.throw(ValidationError)
    })
    it('should not pass test equal with object', function() {
      const object = {}
      expect(_ => new Validation(object).equal({})).to.throw(ValidationError)
      expect(_ => new Validation(object).equal('hey', {}, 'ho')).to.throw(ValidationError)
      expect(_ => new Validation(object).equal('hey', {}, 'ho')).to.throw(ValidationError)
    })    
  })
  
})