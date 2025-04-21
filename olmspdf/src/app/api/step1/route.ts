// app/api/step1/route.ts
import { prisma } from "../../../../lib/prisma.ts";

export async function POST(req: Request) {
  const { name, fatherName, age , email } = await req.json();

  // Validate input data
  if (!name || !fatherName || !age || !email) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    await prisma.formData.create({
      data: {
        name,
        fatherName,
        age,
        email, 
      },
    });

    return new Response("step1 is successful updated", { status: 200 });
  } catch (error) {
    console.error("Error saving data:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
