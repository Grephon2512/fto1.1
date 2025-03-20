import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { color, texture, material } = await req.json();
    if (!color || !texture || !material) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("designs");

    const newDesign = {
      userEmail: session.user?.email,
      color,
      texture,
      material,
      createdAt: new Date(),
    };

    await collection.insertOne(newDesign);

    return NextResponse.json({ message: "Design saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error saving design:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
