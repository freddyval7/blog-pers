import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const data = await req.json();

  try {
    await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
    revalidatePath("/blogs");
    return NextResponse.json({ message: "Blog created successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Unknown error" });
    }
  }

}
