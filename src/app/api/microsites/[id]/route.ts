import { NextResponse } from "next/server";
import { getMicrosite } from "@/lib/microsite-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!/^[a-f0-9]{16}$/.test(id)) {
    return NextResponse.json({ error: "Invalid microsite ID" }, { status: 400 });
  }

  const data = await getMicrosite(id);
  if (!data) {
    return NextResponse.json(
      { error: "Microsite not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(data);
}
