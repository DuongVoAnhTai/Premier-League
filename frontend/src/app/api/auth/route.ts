import api from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const { username, password } = await req.json();
      const response = await api.post("/login", { username, password });
      return NextResponse.json(response.data);
    } catch (error) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  }