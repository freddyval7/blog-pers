import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  try {
    await prisma.user.update({
      where: {
        id: +params.id,
      },
      data: {
        username: data.username,
        email: data.email,
      },
    });
    revalidatePath("/dashboard");
    return NextResponse.json({ message: "User updated" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Unknown error" });
    }
  }
}
