/// <reference path="../typings/index.d.ts"/>

const ValidationError = require('./Errors/ValidationError')
const Validation = require('./Validation')

/**
 * 
 * @param {SchemaModel} schema 
 */
function Schema(schema) {
  this.schema = schema
}

/**
 * @param {ValidationReturn} valid
 * @return {ValidationReturn}
 */
Schema.prototype.validate = function (object, schema = this.schema, valid = { valid: true, error: null }, path = '') {
  if (!object) {
    valid = {
      valid: false,
      error: 'Validate object is null'
    }
  }
  if (!valid.valid) return valid
  Object.keys(schema).map(key => {
    const currentPath = path ? `${path}.${key}` : `${key}`
    const field = schema[key]
    const expected = object[key]
    if (!object[key]) {
      valid = {
        valid: false,
        error: `Field ${currentPath} must exists`
      }
    } else if (typeof field === 'function') {
      try {
        const validation = new Validation(expected)
        field.call(this, validation, expected)
      } catch (error) {
        if (error instanceof ValidationError) {
          valid = {
            valid: false,
            error: error.message
          }
        }
      }
    } else if (Array.isArray(field)) {
      if (!Array.isArray(expected)) {
        valid = {
          valid: false,
          error: `${currentPath} should be an array`
        }
      } else {
        expected.map(o => {
          const validResult = this.validate(o, field[0], valid, currentPath)
          if (valid.valid && !validResult.valid) valid = validResult
        })
      }
    } else {
      valid = this.validate(expected, field, valid, currentPath)
    }
  })
  return valid
}

module.exports = Schema