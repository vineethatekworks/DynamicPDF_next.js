// app/api/step2/route.ts
import { prisma } from "../../../../lib/prisma.ts";

export async function POST(req: Request) {
  const { id, designation, address, postalAddress, phoneNumber, aadhaarNumber, email } = await req.json();

  // Validate input data
  if (!id || !designation || !address || !postalAddress || !phoneNumber || !aadhaarNumber || !email) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    
    const updatedFormData = await prisma.formData.update({
      where: { id },
      data: {
        designation,
        address,
        postalAddress,
        phoneNumber,
        aadhaarNumber,
        email, 
      },
    });

    return new Response(JSON.stringify(updatedFormData), { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
