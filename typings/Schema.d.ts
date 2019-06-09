declare type SchemaModel = {
  [key: string]: ValidatorFunctionModel | SchemaModel | SchemaModel[]
}

declare type ValidatorFunctionModel = (validator: ValidationModel) => ValidationModel  

