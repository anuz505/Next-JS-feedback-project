import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import type { Feedback, ReqBody } from "@/app/lib/types";
import { Prisma } from "@/app/generated/prisma/client";
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";

    const where: Prisma.FeedbackWhereInput = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    const [feedbackList, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
      }),
      prisma.feedback.count({ where }),
    ]);

    // const res: Feedback[] = await prisma.feedback.findMany({
    //   orderBy: { created_at: "desc" },
    // });
    return NextResponse.json(
      { success: true, data: feedbackList },
      { status: 200 }
    );
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
    console.log("Received body:", body);

    const { title, description, rating } = body;

    // Validation
    if (!title || title.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        title,
        description: description || null,
        rating,
      },
    });

    return NextResponse.json(
      { success: true, data: feedback },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/feedback error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to create feedback",
      },
      { status: 500 }
    );
  }
}
