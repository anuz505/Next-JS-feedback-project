import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import React from "react";

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
    const body = await request.json();
    const { status } = body;

    const valStatus = ["open", "progress", "done"];
    if (!status || !valStatus.includes(status)) {
      NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }
    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });
    if (!feedback) {
      return NextResponse.json(
        { success: false, error: "Feedback not found" },
        { status: 404 }
      );
    }
    const updated = await prisma.feedback.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ success: true, data: updated }, { status: 200 });
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
