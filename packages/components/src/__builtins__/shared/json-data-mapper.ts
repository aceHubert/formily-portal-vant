import get from 'lodash.get'
import { warn } from './utils'

export enum Types {
  FIELD = 'FIELD',
  FUNCTION = 'FUNCTION',
}

export type MapperSchema<T extends Record<string, any>> = {
  /**
   * 是否是数据
   */
  isList?: boolean
  /**
   * data 对应的字段, 查看 lodash.get 使用方法
   * @example 如从对象中取值 {
   *    data: [{
   *      label: '',
   *      firstName: '',
   *      lastName: ''
   *    }],
   *    success:
   * }
   */
  data?: string
  /**
   * 数据映射关系
   * @example {
   *    title: {
   *      sourceField : "label"
   *    },
   *    fullName:{
   *      sourceField : "(firstName, lastName)=>{return firstName + ' ' + lastName}",
   *      type: "FUNCTION"
   *    }
   * }
   */
  format: Record<
    keyof T,
    {
      // 对应到data中的字段名或函数
      sourceField: string | string[]
      // sourceField 类型
      type?: Types
    }
  >
}

export class JsonMapper {
  public static formatToSchema<T extends Record<string, any>>(
    schema: MapperSchema<T>,
    data: T
  ) {
    if (this.invalidSchema(schema) || !data) {
      return
    }
    if (schema.data) {
      data = get(data, schema.data)
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

  /*
   * Mapper to format Json to Object schema.
   */
  private static formatAsObj<T>(
    format: MapperSchema<T>['format'],
    data: T | T[]
  ) {
    if (Array.isArray(data)) {
      data = data[0] // Taking 1st object in array if data passed is array and schema is not list.
    }
    const keys = Object.keys(format)
    return this.formatter(keys, format, data)
  }

  /*
   * Mapper to format Json to List schema.
   */
  private static formatAsList<T>(
    format: MapperSchema<T>['format'],
    data: T | T[]
  ) {
    if (!Array.isArray(data)) {
      data = [data]
    }
    const keys = Object.keys(format)
    return (!Array.isArray(data) ? [data] : data).map((item: any) => {
      return this.formatter(keys, format, item)
    })
  }

  /*
   * Processor Function which returns single transformed object.
   */
  private static formatter<T>(
    keys: string[],
    format: MapperSchema<T>['format'],
    data: T
  ) {
    const regex = /\$/g
    let obj = {}
    keys.forEach((key) => {
      const dataField = format[key].sourceField as string | string[]
      if (
        format[key].type &&
        format[key].type.toUpperCase() === Types.FUNCTION
      ) {
        const dataFieldFn = new Function(`return ${dataField}`)() as Function
        obj = {
          ...obj,
          [key]: this.transformFn(
            dataFieldFn,
            this.getParamsForTransformFn(dataFieldFn, data)
          ),
        }
      } else {
        if (Array.isArray(dataField)) {
          const item = JSON.stringify(dataField)
          const mapFields = JSON.parse(item.replace(regex, ''))
          obj = { ...obj, [key]: this.mapMultipleFields(mapFields, data) }
        } else {
          const mapField = dataField.replace(regex, '')
          obj = { ...obj, [key]: get(data, mapField) }
        }
      }
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
          this.transformFn(field, this.getParamsForTransformFn(field, data))
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

  private static transformFn(fn: Function, params: any[]) {
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
