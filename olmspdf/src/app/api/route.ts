import { sendMailWithPDF } from "../utils/mailer.ts";
import { generatePdf } from "../utils/pdfgenerator.ts";
import { prisma } from "../../../lib/prisma.ts"

export async function POST(req: Request) {
  const { id } = await req.json();
  const data = await prisma.formData.findUnique({ where: { id } });

  if (!data) return new Response("Not found", { status: 404 });

  const pdfBuffer = await generatePdf(data);
  await sendMailWithPDF(data.email, pdfBuffer);

  return new Response(JSON.stringify({ message: "Email sent" }), { status: 200 });
}
