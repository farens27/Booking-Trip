import { NextResponse } from "next/server";
import { deleteTursoDestination } from "@/lib/repositories";

function ensureDevAccess() {
  return process.env.NODE_ENV === "development";
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  if (!ensureDevAccess()) {
    return NextResponse.json({ error: "Dev destination API is disabled." }, { status: 403 });
  }

  await deleteTursoDestination(params.id);
  return NextResponse.json({ ok: true });
}
