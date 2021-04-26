const {expect} = require('chai')
const ValidationError = require('./Errors/ValidationError')
const Schema = require('./Schema')

describe('Schema', function() {
  describe('#validate', function() {
    it('should validate a valid model', function() {
      const {valid} = new Schema({
        number: validator=>  validator.be('number').max(10),
        nestedObject: {
          object: v => v.object(),
        },
        arrayNested : [
          {
            array: v => v.array()
          }
        ]
      }).validate({
        number: 10,
        nestedObject: {
          object: {}
        },
        arrayNested: [
          {array: []}
        ]
      })
      expect(valid).to.be.true
    })
  })
  it('should not validate an invalid model', function () {
    const { valid, error } = new Schema({
      number: validator => validator.be('number').max(3),
      nestedObject: {
        object: v => v.object(),
      },
      arrayNested: [
        {
          array: v => v.array()
        }
      ]
    }).validate({
      number: 10,
      nestedObject: {
        object: {}
      },
      arrayNested: [
        { array: [] }
      ]
    })
    expect(valid).to.be.false
    expect(error).to.be.equal('10 should be inferior to 3')
  })

  it('should make an error on empty object', function () {
    const { valid, error } = new Schema({
      number: validator => validator.be('number').max(3),
      nestedObject: {
        object: v => v.object(),
      },
      arrayNested: [
        {
          array: v => v.array()
        }
      ]
    }).validate({})
    expect(valid).to.be.false
    expect(error).to.be.equal('Field arrayNested must exists')
  })

  it('should make an error on null value', function () {
    const { valid, error } = new Schema({
      number: validator => validator.be('number').max(3),
      nestedObject: {
        object: v => v.object(),
      },
      arrayNested: [
        {
          array: v => v.array()
        }
      ]
    }).validate()
    expect(valid).to.be.false
    expect(error).to.be.equal('Validate object is null')
  })

  it('should make an error on array of expected but not in value', function () {
    const { valid, error } = new Schema({
      objectNested: {
        arrayNested: [
          { array: v => v.array() }
        ]
      }
    }).validate({
      objectNested: {

      }
    })
    expect(valid).to.be.false
    expect(error).to.be.equal('Field objectNested.arrayNested must exists')
  })

  it('should pass on array of expected with empty array in value', function () {
    const { valid, error } = new Schema({
      objectNested: {
        arrayNested: [
          { array: v => v.array() }
        ]
      }
    }).validate({
      objectNested: {
        arrayNested: []
      }
    })
    expect(valid).to.be.true
    expect(error).to.be.equal(null)
  })
})