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
Schema.prototype.validate = function(object, schema = this.schema, valid = { valid: true, error: null}) {
  if(!valid.valid) return valid
  Object.keys(schema).map(key => {
    const field = schema[key]
    const expected = object[key]
    if(typeof field === 'function') {
      try {
        const validation = new Validation(expected)
        field.call(this, validation, expected)
      } catch (error) {
        if(error instanceof ValidationError) {
          valid = {
            valid: false,
            error: error.message
          }
        }
      }
    } else if (Array.isArray(field)) {
      expected.map(o => {
        const validResult = this.validate(o, field[0], valid)
        if(valid.valid && !validResult.valid) valid = validResult
      })
    } else {
      valid = this.validate(expected, field, valid)
    }
  })
  return valid
}

module.exports = Schema