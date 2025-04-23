/* eslint-disable @typescript-eslint/no-unused-vars */
import { requireAuth } from "../../../../../lib/middleware/requireAuth.ts";
import { prisma } from "../../../../../lib/prisma.ts";
import { step1Schema } from "../../../../validations/formdatavalidations.ts";


export async function POST(req: Request) {
  const authResult = await requireAuth(req);
  if (authResult instanceof Response) return authResult;


  const { userId } = authResult.user;


  let jsonBody;
  try {
    jsonBody = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }


  // Zod Validation
  const result = step1Schema.safeParse(jsonBody);


  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }


  const { name, fatherName, age, email } = result.data;


  try {
    await prisma.formData.create({
      data: {
        name,
        fatherName,
        age,
        email,
        nominatedById: userId,
      },
    });


    return new Response("Step 1 successfully saved", { status: 200 });
  } catch (error) {
    console.error("DB error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}


