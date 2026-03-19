import { NextResponse } from "next/server";
import { getAllFacts } from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const facts = await getAllFacts();
    return NextResponse.json(facts);
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
