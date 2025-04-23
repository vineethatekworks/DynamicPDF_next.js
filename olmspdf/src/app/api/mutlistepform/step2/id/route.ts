import { NextRequest } from "next/server";
import { requireAuth } from "../../../../../../lib/middleware/requireAuth.ts";
import { prisma } from "../../../../../../lib/prisma.ts";
import { step2Schema } from "../../../../../validations/formdatavalidations.ts";


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await requireAuth(req);
  if (authResult instanceof Response) return authResult;


  const { user } = authResult;
  const formId = params.id;


  let jsonBody;
  try {
    jsonBody = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }


  const validation = step2Schema.safeParse(jsonBody);
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    return new Response(JSON.stringify({ errors }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }


  const { designation, address, postalAddress, phoneNumber, aadhaarNumber } = validation.data;


  try {
    const existingForm = await prisma.formData.findUnique({
      where: { id: formId },
    });


    if (!existingForm) {
      return new Response(JSON.stringify({ error: "Form not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }


    if (existingForm.nominatedById !== user.id) {
      return new Response(JSON.stringify({
        error: "Unauthorized to update this form",
      }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }


    const updatedFormData = await prisma.formData.update({
      where: { id: formId },
      data: {
        designation,
        address,
        postalAddress,
        phoneNumber,
        aadhaarNumber,
      },
    });


    return new Response(JSON.stringify({
      message: "Step 2 data updated successfully",
      data: updatedFormData,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });


  } catch (error) {
    console.error("Error updating form data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


