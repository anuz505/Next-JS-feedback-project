import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import type { Feedback, ReqBody } from "@/app/lib/types";
export async function GET() {
  try {
    const res: Feedback[] = await prisma.feedback.findMany({
      orderBy: { created_at: "desc" },
    });
    return NextResponse.json({ success: true, data: res }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch feedbacks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ReqBody = await request.json();
    const { title, description, rating } = body;
    const feedback = await prisma.feedback.create({
      data: { title, description, rating },
    });
    return NextResponse.json(
      { success: true, data: feedback },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create a new feedback",
      },
      { status: 500 }
    );
  }
}
