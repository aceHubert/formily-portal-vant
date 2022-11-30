import { createResource } from '@vue-async/resource-manager'
import { JsonMapper } from './json-data-mapper'

// Types
import type { ResourceResult } from '@vue-async/resource-manager'
import type { ScopedDataSource, RemoteDataSource } from './types'

type ResourceInput<Item> = {
  dataSource: ScopedDataSource<Item> | RemoteDataSource<Item>
  params?: { [key: string]: any }
}

export function createDataResource<Item>({
  scopedDataRequest,
  dataRequest,
}: {
  scopedDataRequest: (ids: number[]) => Promise<Record<string, boolean>>
  dataRequest: (config: any) => Promise<any>
}) {
  return createResource(async (options: ResourceInput<Item>) => {
    if (Array.isArray(options.dataSource)) {
      let scopedDataIds: number[]
      if (
        (scopedDataIds = options.dataSource
          .filter((item) => item.dataScopeId !== void 0)
          .map((item) => item.dataScopeId)).length
      ) {
        const scopedResult = await scopedDataRequest(scopedDataIds)
        return options.dataSource.filter(
          (item) =>
            item.dataScopeId === void 0 || !!scopedResult[item.dataScopeId]
        )
      } else {
        return options.dataSource
      }
    } else {
      const { url, schema, ...rest } = options.dataSource
      const resp = await dataRequest({
        ...rest,
        url:
          url +
          (Object.keys(options.params || {}).length
            ? `${url.indexOf('?') >= 0 ? '&' : '?'}${Object.entries(
                options.params
              )
                .map(([key, value]) => `${key}=${value}`)
                .join('&')}`
            : ''),
      })
      return JsonMapper.formatToSchema<Item>(schema, resp)
    }
  }) as ResourceResult<ResourceInput<Item>, Item[]>
}
