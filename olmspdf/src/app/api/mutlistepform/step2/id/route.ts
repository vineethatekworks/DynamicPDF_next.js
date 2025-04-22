import { NextRequest } from "next/server.js";
import { requireAuth } from "../../../../../../lib/middleware/requireAuth.ts";
import { prisma } from "../../../../../../lib/prisma.ts";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }
) {
  // Authenticate the user
  const authResult = await requireAuth(req);
  if (authResult instanceof Response) return authResult;

  const { user } = authResult;

  const formId = params.id;

  // Parse the request body
  const {
    designation,
    address,
    postalAddress,
    phoneNumber,
    aadhaarNumber,
  } = await req.json();

  // Validate input data
  if (
    !designation ||
    !address ||
    !postalAddress ||
    !phoneNumber ||
    !aadhaarNumber 
  ) {
    return new Response(
      JSON.stringify({ error: "Missing required fields" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Check if the form exists
    const existingForm = await prisma.formData.findUnique({
      where: { id: formId },
    });

    if (!existingForm) {
      return new Response(
        JSON.stringify({ error: "Form data not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Verify that the authenticated user is authorized to update the form
    if (existingForm.nominatedById !== user.id) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized: You can only update your own form data",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Update the form data
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

    return new Response(
      JSON.stringify({
        message: "Form data updated successfully",
        data: updatedFormData,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating form data:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
