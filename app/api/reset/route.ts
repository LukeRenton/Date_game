import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function DELETE() {
  await redis.del("submissions");
  return NextResponse.json({ success: true });
}
