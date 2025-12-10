import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { Feedback, ReqBody } from "@/app/lib/types";
export async function GET(
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
    const feedback: Feedback | null = await prisma.feedback.findUnique({
      where: { id: id },
    });
    if (!feedback) {
      return NextResponse.json(
        {
          success: false,
          error: "Couldn't find the feedback",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: feedback });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `something went wrong while getting this feedback. errors: ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramsId } = await params;
    const id = parseInt(paramsId);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }
    const body: ReqBody = await request.json();
    const { title, description, rating } = body;
    const feedback = await prisma.feedback.update({
      where: { id: id },
      data: { title, description, rating },
    });
    return NextResponse.json(
      {
        success: true,
        data: feedback,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          error: "Couldn't find the feedback",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: `something went wrong while updating this feedback. errors: ${error}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: paramsId } = await params;
    const id = parseInt(paramsId);
    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }
    const deletedFeedback = await prisma.feedback.delete({
      where: { id: id },
    });
    return NextResponse.json({
      success: true,
      message: "Feedback deleted successfully",
      data: deletedFeedback,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          error: "Couldn't find the feedback",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: `something went wrong while deleting this feedback. errors: ${error}`,
      },
      { status: 500 }
    );
  }
}
