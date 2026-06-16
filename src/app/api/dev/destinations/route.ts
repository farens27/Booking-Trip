import { NextResponse } from "next/server";
import {
  listTursoDestinations,
  saveTursoDestination,
} from "@/lib/repositories";
import { Destination } from "@/types";

function ensureDevAccess() {
  return process.env.NODE_ENV === "development";
}

export async function GET() {
  if (!ensureDevAccess()) {
    return NextResponse.json({ error: "Dev destination API is disabled." }, { status: 403 });
  }

  const destinations = await listTursoDestinations();
  return NextResponse.json({ destinations });
}

export async function POST(request: Request) {
  if (!ensureDevAccess()) {
    return NextResponse.json({ error: "Dev destination API is disabled." }, { status: 403 });
  }

  const destination = (await request.json()) as Destination;
  const savedDestination = await saveTursoDestination(destination);

  return NextResponse.json({ destination: savedDestination });
}
