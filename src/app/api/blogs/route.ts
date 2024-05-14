import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
import { ResultMysql } from "@/lib/utils";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM blog");
    return NextResponse.json(results);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Unknown error" });
    }
  }
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    const result: ResultMysql = await conn.query("INSERT INTO blog SET ?", {
      name,
      description,
    });

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: {
        id: result.insertId,
        name,
        description,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Unknown error" });
    }
  }
}
