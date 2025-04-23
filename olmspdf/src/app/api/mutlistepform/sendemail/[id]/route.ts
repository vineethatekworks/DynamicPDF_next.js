/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "../../../../../../lib/prisma.ts";
import { requireAuth } from "../../../../../../lib/middleware/requireAuth.ts";
import { sendMailWithPDF } from "../../../../utils/mailer.ts";
import { getPDFFromS3 } from "../../../../utils/uploadtos3.ts";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await requireAuth(req);
    if (authResult instanceof Response) return authResult;

    const email = authResult.user.email;
    console.log("email:", email);

    const { id: formId } = await context.params; 

    const formData = await prisma.formData.findUnique({
      where: { id: formId },
    });

    if (!formData) {
      return new NextResponse("Form not found", { status: 404 } as any);
    }

    const pdfData = await getPDFFromS3(formId);
    if (!pdfData) {
      return new NextResponse("Failed to fetch PDF", { status: 500 }as any);
    }

    const emailSent = await sendMailWithPDF(pdfData, email);
    if (emailSent) {
      return new NextResponse("Email sent successfully", { status: 200 }as any);
    } else {
      return new NextResponse("Failed to send email", { status: 500 }as any);
    }
  } catch (error) {
    console.error("Server error:", error);
    return new NextResponse("Internal server error", { status: 500 }as any);
  }
}
