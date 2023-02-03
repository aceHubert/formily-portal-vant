import get from 'lodash.get'
import { warn } from './utils'

export type MapperSchema<T extends Record<string, any>> = {
  /**
   * 是否是List
   */
  isList?: boolean
  /**
   * data 对应的字段, 查看 lodash.get 使用方法
   * @example 如从对象中取值
   *  response {
   *    data: [{
   *      label: '',
   *      firstName: '',
   *      lastName: ''
   *    }],
   *    success:
   * }
   * set data as "data"
   * @example expression {{(response)=>{ return response.data}}}
   */
  data?: string
  /**
   * 数据映射关系
   * @example {
   *    title: {
   *      sourceField : "label"
   *    },
   *    fullName:{
   *      sourceField : "{{(firstName, lastName)=>{return firstName + ' ' + lastName}}}",
   *    }
   * }
   */
  format: Record<
    keyof T,
    {
      // 对应到data中的字段名或函数
      sourceField: string
    }
  >
}

export class JsonMapper {
  public static formatToSchema<T extends Record<string, any>>(
    schema: MapperSchema<T>,
    data: T,
    scope?: any
  ) {
    if (scope === void 0) {
      scope = {}
    }
    if (this.invalidSchema(schema) || !data) {
      return
    }
    if (schema.data) {
      var matched = schema.data.match(this.ExpRE)
      if (!matched) {
        data = get(data, schema.data)
      } else {
        const compile = new Function(
          '$root',
          `with($root){ return (${matched[1]}); }`
        )(scope) as Function
        data = this.exec(compile, [data])
      }
      warn(!!data, 'JsonMapper -> data is undifined!')
    }
    if (this.checkIfSchemaIsList(schema)) {
      return this.formatAsList(schema.format, data)
    } else {
      return this.formatAsObj(schema.format, data)
    }
  }

  private static COMMENTS: any = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm
  private static DEFAULT_PARAMS: any = /=[^,]+/gm
  private static FAT_ARROWS: any = /=>.*$/gm
  private static ExpRE = /^\s*\{\{([\s\S]*)\}\}\s*$/

  /*
   * Mapper to format Json to Object schema.
   */
  private static formatAsObj<T>(
    format: MapperSchema<T>['format'],
    data: T | T[],
    scope?: any
  ) {
    if (Array.isArray(data)) {
      data = data[0] // Taking 1st object in array if data passed is array and schema is not list.
    }
    const keys = Object.keys(format)
    return this.formatter(keys, format, data, scope)
  }

  /*
   * Mapper to format Json to List schema.
   */
  private static formatAsList<T>(
    format: MapperSchema<T>['format'],
    data: T | T[],
    scope?: any
  ) {
    if (!Array.isArray(data)) {
      data = [data]
    }
    const keys = Object.keys(format)
    return (!Array.isArray(data) ? [data] : data).map((item: any) => {
      return this.formatter(keys, format, item, scope)
    })
  }

  /*
   * Processor Function which returns single transformed object.
   */
  private static formatter<T>(
    keys: string[],
    format: MapperSchema<T>['format'],
    data: T,
    scope?: any
  ) {
    const regex = /\$/g
    let obj = {}
    keys.forEach((key) => {
      const dataField = format[key].sourceField as string
      var matched = dataField.match(this.ExpRE)
      if (!matched) {
        obj = {
          ...obj,
          [key]: get(data, dataField),
        }
      } else {
        const compile = new Function(
          '$root',
          `with($root){ return (${matched[1]}) }`
        )(scope) as Function
        obj = {
          ...obj,
          [key]: this.exec(
            compile,
            this.getParamsForTransformFn(compile, data)
          ),
        }
      }
      // else {
      //   if (Array.isArray(dataField)) {
      //     const item = JSON.stringify(dataField)
      //     const mapFields = JSON.parse(item.replace(regex, ''))
      //     obj = { ...obj, [key]: this.mapMultipleFields(mapFields, data) }
      //   } else {
      //     const mapField = dataField.replace(regex, '')
      //     obj = { ...obj, [key]: get(data, mapField) }
      //   }
      // }
    })
    return obj
  }

  private static invalidSchema<T>(schema: MapperSchema<T>) {
    return !schema || !schema.format
  }

  private static checkIfSchemaIsList<T>(schema: MapperSchema<T>) {
    return schema.isList
  }

  private static mapMultipleFields<T>(
    fields: Array<string | Function>,
    data: T
  ) {
    const dataset: any = []
    fields.forEach((field) => {
      if (field instanceof Function) {
        dataset.push(
          this.exec(field, this.getParamsForTransformFn(field, data))
        )
      } else {
        dataset.push(get(data, field))
      }
    })
    return dataset
  }

  private static getParamsForTransformFn<T>(fn: Function, data: T) {
    return this.getParameterNames(fn).map((param: string) => {
      return data[param]
    })
  }

  private static exec(fn: Function, params: any[]) {
    return fn.apply(fn, params)
  }

  private static getParameterNames(fn: Function) {
    const code = fn
      .toString()
      .replace(this.COMMENTS, '')
      .replace(this.FAT_ARROWS, '')
      .replace(this.DEFAULT_PARAMS, '')
    const result = code
      .slice(code.indexOf('(') + 1, code.indexOf(')'))
      .match(/([^\s,]+)/g)
    return result === null ? [] : result
  }
}
