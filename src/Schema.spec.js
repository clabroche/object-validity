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
  it('should not validate an invalid model', function() {
    const {valid, error} = new Schema({
      number: validator=>  validator.be('number').max(3),
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
    expect(valid).to.be.false
    expect(error).to.be.equal('10 should be inferior to 3')
  })
})