#Object-validity

## Install
``` bash 
npm i @iryu54/object-validity
```

## Usage

A schema object is a collection of field to validate. Each field are a function with a validator object. A validator function can be chained. ex:
``` javascript
validator => validator.be('number').min(2).max(5)
```

``` javascript
const objectToValidate = {
  number: 10,
  nestedObject: {
    object: {}
  },
  arrayNested: [
    {array: []}
  ]
}
const {valid, error} = new Schema({
  number: validator=>  validator.be('number').min(9).max(12),
  nestedObject: { object: v => v.object() },
  arrayNested : [
    { array: v => v.array() }
  ]
}).validate(objectToValidate)
expect(valid).to.be.true
expect(error).to.be.null
```
