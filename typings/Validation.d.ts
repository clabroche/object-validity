declare type ValidationModel  = {
  min: (val = 0) => ValidationModel
  max: (val = Infinity) => ValidationModel
  between: (min = 0, max = Infinity) => ValidationModel
  number: () => ValidationModel
  string: () => ValidationModel
  array: () => ValidationModel
  object: () => ValidationModel
  boolean: () => ValidationModel
  toBeTruthy: () => ValidationModel
  toBeFalsy: () => ValidationModel
  be: (type: 'number' | 'object' | 'array') => ValidationModel
  notNull: () => ValidationModel
  null: () => ValidationModel
}

declare type ValidationReturn = {
  valid: boolean
  error: string
} 