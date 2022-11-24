import { createResource } from '@vue-async/resource-manager'
import { JsonMapper } from './json-data-mapper'

// Types

import type { ResourceResult } from '@vue-async/resource-manager'
import type { ScopedDataSource, RemoteDataSource } from './types'

export function createDataResource<Item, Params extends { [key: string]: any }>(
  dataSource: ScopedDataSource<Item> | RemoteDataSource<Item>,
  {
    scopedDataRequest,
    dataRequest,
  }: {
    scopedDataRequest: (ids: number[]) => Promise<Record<string, boolean>>
    dataRequest: (config: any) => Promise<any>
  }
) {
  return createResource(async (params = {}) => {
    if (Array.isArray(dataSource)) {
      let scopedDataIds: number[]
      if (
        (scopedDataIds = dataSource
          .filter((item) => item.dataScopeId !== void 0)
          .map((item) => item.dataScopeId)).length
      ) {
        const scopedResult = await scopedDataRequest(scopedDataIds)
        return dataSource.filter(
          (item) =>
            item.dataScopeId === void 0 || !!scopedResult[item.dataScopeId]
        )
      } else {
        return dataSource
      }
    } else {
      const { url, schema } = dataSource
      const resp = await dataRequest({
        url:
          url +
          (Object.keys(params).length
            ? `${url.indexOf('?') >= 0 ? '&' : '?'}${Object.entries(params)
                .map(([key, value]) => `${key}=${value}`)
                .join('&')}`
            : ''),
      })
      return JsonMapper.formatToSchema<Item>(schema, resp)
    }
  }) as ResourceResult<Params, Item[]>
}
