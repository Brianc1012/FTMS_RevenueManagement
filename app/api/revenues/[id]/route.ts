// api\revenues\[id]\route.ts

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logAudit } from '@/lib/auditLogger'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const revenue = await prisma.revenueRecord.findUnique({
    where: { revenue_id: id },
  })

  if (!revenue || revenue.isDeleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(revenue)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await req.json()

  try {
    const previousRevenue = await prisma.revenueRecord.findUnique({
      where: { revenue_id: id }
    })

    if (!previousRevenue || previousRevenue.isDeleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const updatedRevenue = await prisma.revenueRecord.update({
      where: { revenue_id: id },
      data: {
        ...data,
        updated_at: new Date(),
      },
    })

    await logAudit({
      action: 'UPDATE',
      table_affected: 'RevenueRecord',
      record_id: id,
      performed_by: data.created_by ?? 'unknown',
      details: `Updated revenue record. Changes: ${JSON.stringify({
        previous: {
          category: previousRevenue.category,
          amount: previousRevenue.total_amount
        },
        new: {
          category: updatedRevenue.category,
          amount: updatedRevenue.total_amount
        }
      })}`
    })

    return NextResponse.json(updatedRevenue)
  } catch (error) {
    console.error('Failed to update revenue:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const revenueToDelete = await prisma.revenueRecord.findUnique({
      where: { revenue_id: id }
    })

    if (!revenueToDelete || revenueToDelete.isDeleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await prisma.revenueRecord.update({
      where: { revenue_id: id },
      data: { isDeleted: true, updated_at: new Date() },
    })

    await logAudit({
      action: 'DELETE',
      table_affected: 'RevenueRecord',
      record_id: id,
      performed_by: req.headers.get('user-id') ?? 'system',
      details: `Soft-deleted revenue record. Details: ${JSON.stringify({
        category: revenueToDelete.category,
        amount: revenueToDelete.total_amount,
        date: revenueToDelete.date
      })}`
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete revenue:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}