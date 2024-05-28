import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();
  const userFound = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userFound) {
    return NextResponse.json(
      { message: "User with that email already exists" },
      { status: 400 }
    );
  }

  try {
    const hashedPass = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPass,
      },
    });
    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Unknown error" });
    }
  }
}
