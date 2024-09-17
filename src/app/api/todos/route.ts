import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {title} = await request.json();

  // Perform any necessary validation here

  const newTodo = await prisma.todo.create({
    data: {
      title
    },
  });

  return NextResponse.json(newTodo, {status: 200, message:'Successfully created'})
}