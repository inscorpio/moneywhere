'use server'
import type { Category } from '@prisma/client'
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { z } from 'zod'
import prisma from '~/prisma/db'

const CategoryInputSchema = z.object({
  label: z.string({ required_error: '请输入分类名称' }).min(1, { message: '请输入分类名称' }).max(191, { message: '分类名称不能超过 191 位' }),
})

export type CategoryCreate = z.infer<typeof CategoryInputSchema>
export type CategoryClient = Pick<Category, 'id' | 'label'>

export async function requestCategoryCreate(category: CategoryCreate) {
  try {
    const validation = CategoryInputSchema.safeParse(category)
    if (!validation.success)
      return { message: '参数错误', error: validation.error.format() }

    const data: CategoryClient = await prisma.category.create({
      data: category,
      select: {
        id: true,
        label: true,
      },
    })
    return { message: '创建成功', data }
  }
  catch (error) {
    const PrismaClientKnownRequestError = error as PrismaClientKnownRequestError
    if (PrismaClientKnownRequestError.code === 'P2002')
      return { message: '该分类已存在', error }

    if (error?.toString() === 'SyntaxError: Unexpected end of JSON input')
      return { message: '解析 ResponseBody 失败', error }

    return { message: '未知错误', error }
  }
}

export async function requestCategoryList() {
  const data: CategoryClient[] = await prisma.category.findMany({
    select: {
      id: true,
      label: true,
    },
  })
  return { data }
}