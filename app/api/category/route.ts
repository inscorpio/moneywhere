import { type NextRequest, NextResponse } from 'next/server'
import { categorySelectField } from '~/actions/Category'
import { catchError } from '~/utils'
import prisma from '~/prisma/db'
import { categorySchema } from '~/schemas'
import type { CategoryClient, CategoryCreate } from '~/types'

export async function POST(request: NextRequest) {
  try {
    const category: CategoryCreate = await request.json()
    const validation = categorySchema.safeParse(category)
    if (!validation.success) {
      return NextResponse.json({ message: '参数错误', errors: validation.error.issues }, { status: 400 })
    }

    const data: CategoryClient = await prisma.category.create({
      data: category,
      select: categorySelectField,
    })
    return NextResponse.json({ success: true, message: '创建成功', data }, { status: 201 })
  }
  catch (error) {
    return catchError(error, { module: '分类' })
  }
}
