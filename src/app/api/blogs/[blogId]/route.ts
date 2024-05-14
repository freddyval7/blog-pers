import { NextResponse } from "next/server";
import { conn } from "@/lib/mysql";
import { ResultMysql } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const result: string = await conn.query("SELECT * FROM blog WHERE id = ?", [
      params.blogId,
    ]);

    if (result.length === 0) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
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
  request: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const result: ResultMysql = await conn.query(
      "DELETE FROM blog WHERE id = ?",
      [params.blogId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: "Unknown error" });
    }
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { blogId: string } }
) {
  const { title, description } = await request.json();

  const result: ResultMysql = await conn.query(
    "UPDATE blog SET ? WHERE id = ?",
    [
      {
        title,
        description,
      },
      params.blogId,
    ]
  );

  return NextResponse.json({
    message: {
      id: params.blogId,
      title,
      description,
    },
  });
}
