import { generateService } from '@umijs/openapi'

generateService({
  requestLibPath: 'import request from \'@/utils/request\'',
  schemaPath: 'http://localhost:8000/v3/api-docs',
  serversPath: './src',
  hook: {
    customType(schemaObject, namespace) {
      console.log('schemaObject', schemaObject)

      if (schemaObject.type === 'array') {
        if (schemaObject.items.format === 'int64') {
          return 'string[]'
        }
      }

      if (schemaObject.format === 'int64') {
        return 'string'
      }
    },
  },
})
