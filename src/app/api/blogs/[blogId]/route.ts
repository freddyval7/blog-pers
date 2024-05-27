import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  const data = await req.json();
  try {
    await prisma.blog.update({
      where: {
        id: +params.blogId,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
    return NextResponse.json({ message: "Blog updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Unknown error" });
    }
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    await prisma.blog.delete({
      where: {
        id: +params.blogId,
      },
    });
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Unknown error" });
    }
  }
}
