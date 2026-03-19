import { NextResponse } from "next/server";
import { addSubmission } from "@/lib/kv";

export async function POST(request: Request) {
  try {
    const { name, fact1, fact2 } = await request.json();

    if (!name?.trim() || !fact1?.trim() || !fact2?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await addSubmission(name.trim(), fact1.trim(), fact2.trim());
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
