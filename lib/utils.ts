import ms from 'ms'
import Ajv from 'ajv'
import _ from 'lodash'


const ajv = new Ajv()

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) {
    return 'never'
  }
  return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? '' : ' ago'
  }`
}


export const nFormatter = (num: number, digits?: number) => {
  if (!num) {
    return '0'
  }
  const lookup = [
    {value: 1, symbol: ''},
    {value: 1e3, symbol: 'K'},
    {value: 1e6, symbol: 'M'},
    {value: 1e9, symbol: 'G'},
    {value: 1e12, symbol: 'T'},
    {value: 1e15, symbol: 'P'},
    {value: 1e18, symbol: 'E'},
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
      .slice()
      .reverse()
      .find(function(curItem) {
        return num >= curItem.value
      })
  return item ?
    (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol :
    '0'
}


export const capitalize = (str: string) => {
  if (!str || typeof str !== 'string') {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}


export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) {
    return str
  }
  return `${str.slice(0, length)}...`
}

export const validateActionSchema = (unparsedSchema: string) => {
  let schema
  try {
    schema = JSON.parse(unparsedSchema)
  } catch (e) {
    return [{
      instancePath: '',
      schemaPath: '',
      message: 'Invalid JSON.',
    }]
  }

  const validationSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
      properties: {
        type: 'object',
        propertyNames: {
          pattern: '^[a-zA-Z0-9_]+$',
        },
        additionalProperties: {
          type: 'object',
          properties: {
            _description: {type: 'string'},
            _examples: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  'user says': {type: 'string'},
                  'assistant says': {type: 'string'},
                  'assistant action includes': {type: 'object'},
                },
                required: ['assistant action includes'],
              },
            },
            required: {type: 'array', items: {type: 'string'}},
            type: {type: 'string'},
            enum: {type: 'array'},
          },
          required: ['_description', '_examples'],
        },
      },
      required: {
        type: 'array',
        items: {type: 'string'},
      },
    },
    required: ['properties'],
  }

  const validate = ajv.compile(validationSchema)
  let valid = validate(schema)

  // run a check to ensure that for each property, the "assistant action includes" object has the same key as the property name

  _.forEach(schema.properties, (property, propertyName) => {
    _.forEach(property._examples, (example) => {
      if (example['assistant action includes'] && example['assistant action includes'][propertyName] === undefined) {
        valid = false
        if (!validate.errors) {
          validate.errors = []
        }

        validate.errors.push({
          // @ts-ignore
          instancePath: `properties.${propertyName}._examples`,
          message: `The assistant action includes object must have a key that matches the property name.`,
        })
      }
    })
  })
  return valid ? [] : validate.errors
}
