import { requireAuth } from "../../../../../../lib/middleware/requireAuth.ts";
import { generatePdf } from "../../../../utils/pdfgenerator.ts";
import { prisma } from "../../../../../../lib/prisma.ts";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const authResult = await requireAuth(req);
    if (authResult instanceof Response) return authResult;

    const userId = authResult.user.userId;
    const formId = params.id;

    const formData = await prisma.formData.findUnique({ where: { id: formId } });

    if (!formData) {
      return new Response("Form not found", { status: 404 });
    }

    if (formData.nominatedById !== userId) {
      return new Response("Unauthorized", { status: 403 });
    }

    await generatePdf(formData);

    return new Response("PDF generated successfully", { status: 200 });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
