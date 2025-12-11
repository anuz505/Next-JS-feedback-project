import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }
    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });
    const updated = await prisma.feedback.update({
      where: { id: id },
      data: {
        upvotes: !feedback?.upvotes,
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `something went wrong while upvoting ${error}`,
      },
      { status: 500 }
    );
  }
}
