/// <reference path="../typings/index.d.ts"/>

const ValidationError = require('./Errors/ValidationError')
const typeDetect = require('type-detect');

function Validation(expected) {
  this.expected = expected
}
Validation.prototype.min = function(val = 0) {
  this.number()
  if(this.expected < val) 
    throw new ValidationError(`${this.expected} should be superior to ${val}`)
  return this
}
Validation.prototype.max = function(val = Infinity) {
  this.number()
  if(this.expected > val) 
    throw new ValidationError(`${this.expected} should be inferior to ${val}`)
  return this
}
Validation.prototype.between = function(min = 0, max = Infinity) {
  this.min(min)
  this.max(max)
  return this
}
Validation.prototype.number = function() {
  return this.be('number')
}
Validation.prototype.equal = function(...equalities) {
  const valid = equalities.map(e => this.expected === e).filter(e => e)
  if (!valid.length)
    throw new ValidationError(`${this.expected} should be equal to ${equalities.join(' or ')}`)
  return this
}
Validation.prototype.object = function() {
  return this.be('object')
}
Validation.prototype.string = function() {
  return this.be('string')
}
Validation.prototype.array = function() {
  return this.be('array')
}
Validation.prototype.lengthOf = function(nb) {
  if(!this.expected || this.expected.length !== nb)
    throw new ValidationError(`${this.expected} should be length of ${nb}` )
}
Validation.prototype.boolean = function() {
  return this.be('boolean')
}
Validation.prototype.toBeTruthy = function() {
  if(this.boolean() && !this.expected)
    throw new ValidationError(`${this.expected} should be true`)
}
Validation.prototype.toBeFalsy = function() {
  if(this.boolean() && this.expected)
    throw new ValidationError(`${this.expected} should be false`)
}
/**
 * @param {'number' | 'object' | 'array' | 'boolean' | 'string' | Array<'number' | 'object' | 'array' | 'boolean' | 'string' >} _type
 */
Validation.prototype.be = function(_type = 'object') {
  if(Array.isArray(_type)) {
    const isValid = _type.includes(typeDetect(this.expected).toLowerCase())
    if(!isValid) throw new ValidationError(`${this.expected} should be ${_type}`)
  } else {
    if(typeDetect(this.expected).toLowerCase() !== _type.toLowerCase()) {
      throw new ValidationError(`${this.expected} should be ${_type}`)
    }
  }
  return this
}
Validation.prototype.notNull = function() {
  if (this.expected === null) 
    throw new ValidationError(`Should not be null`)
  return this
}
Validation.prototype.null = function() {
  if (this.expected !== null) 
    throw new ValidationError(`Should be null`)
  return this
}
module.exports = Validation 