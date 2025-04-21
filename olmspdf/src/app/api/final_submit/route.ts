import { sendMailWithPDF } from "../../utils/mailer.ts";
import { generatePdf } from "../../utils/pdfgenerator.ts";
import { prisma } from "../../../../lib/prisma.ts";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return new Response("ID is required", { status: 400 });
  const data = await prisma.formData.findUnique({ where: { id } });

  if (!data) return new Response("Not found", { status: 404 });

  const pdfBuffer = await generatePdf(data);
  await sendMailWithPDF(data.email, pdfBuffer);

  return new Response(JSON.stringify({ message: "Form filled successfully and Email sent to the mail id provided" }), { status: 200 });
}
