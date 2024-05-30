import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user && session.user.email as string,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: {
            id: user.id,
          },
        }
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
