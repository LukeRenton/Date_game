import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export interface Submission {
  name: string;
  fact1: string;
  fact2: string;
}

export interface Fact {
  fact: string;
  name: string;
}

export async function addSubmission(
  name: string,
  fact1: string,
  fact2: string
): Promise<void> {
  const current: Submission[] =
    (await redis.get<Submission[]>("submissions")) || [];
  current.push({ name, fact1, fact2 });
  await redis.set("submissions", current);
}

export async function getAllFacts(): Promise<Fact[]> {
  const submissions: Submission[] =
    (await redis.get<Submission[]>("submissions")) || [];
  const facts: Fact[] = submissions.flatMap((s) => [
    { fact: s.fact1, name: s.name },
    { fact: s.fact2, name: s.name },
  ]);
  // Fisher-Yates shuffle
  for (let i = facts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [facts[i], facts[j]] = [facts[j], facts[i]];
  }
  return facts;
}
