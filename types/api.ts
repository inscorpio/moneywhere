import type { z } from 'zod'
import type { CategoryClient, CategoryCreate, WalletAccountClient, WalletAccountCreate } from '~/types'

export enum RequestUrl {
  wallet = '/wallet',
  category = '/category',
}

export type RequestMethod = 'get' | 'post'

export interface RequestModule {
  [RequestUrl.wallet]: {
    get: {
      request: undefined
      response: WalletAccountClient[]
    }
    post: {
      request: WalletAccountCreate
      response: unknown
    }
  }
  [RequestUrl.category]: {
    get: {
      request: undefined
      response: CategoryClient[]
    }
    post: {
      request: CategoryCreate
      response: unknown
    }
  }
}

interface ResponseSuccessUnknownData<T = unknown> {
  success: true
  message: string
  data: T
}

interface ResponseSuccess<U extends RequestUrl, M extends RequestMethod | undefined> {
  success: true
  message: string
  data: M extends RequestMethod ? RequestModule[U][M]['response'] : RequestModule[U]['get']['response']
}

interface ResponseError {
  success: false
  message: string
  errors: z.ZodIssue[]
}

export type ResponseData<U extends RequestUrl, M extends RequestMethod | undefined> = ResponseSuccess<U, M> | ResponseError
export type ResponseDataUnknownServiceData<T = unknown> = ResponseSuccessUnknownData<T> | ResponseError