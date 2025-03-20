import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("designs");

    const userDesigns = await collection.find({ userEmail: session.user?.email }).toArray();

    return NextResponse.json(userDesigns, { status: 200 });
  } catch (error) {
    console.error("Error fetching designs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
