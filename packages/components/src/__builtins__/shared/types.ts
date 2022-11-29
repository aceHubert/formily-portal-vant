import type { Component, VNode } from 'vue'
import type { MapperSchema } from './json-data-mapper'

export type SlotTypes =
  | Component
  | string
  | number
  | ((props: Record<string, any>) => VNode[] | VNode)
  | VNode

export type ScopedDataSource<T> = Array<T & { dataScopeId?: number }>

export type RemoteDataSource<T> = {
  url: string
  schema: MapperSchema<T>
  [key: string]: any
}
