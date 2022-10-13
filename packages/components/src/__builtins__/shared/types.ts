import type { Component, VNode } from 'vue'

export type SlotTypes =
  | Component
  | string
  | number
  | ((props: Record<string, any>) => VNode[] | VNode)
  | VNode

export type RemoteDataSource = {
  url: string
  mapper: Record<string, string>
}
