import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const content = formData.get("content");
  const author = formData.get("author");
  console.log(content, author);

  return NextResponse.json({ content, author });
}
