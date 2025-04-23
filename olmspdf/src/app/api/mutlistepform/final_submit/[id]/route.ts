
import { requireAuth } from "../../../../../../lib/middleware/requireAuth.ts";
import { generatePdf } from "../../../../utils/pdfgenerator.ts";
import { prisma } from "../../../../../../lib/prisma.ts";
import { formdata } from "../../../../../validations/formdatavalidations.ts";


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


     const validation = formdata.safeParse(formData);
      if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;
        return new Response(JSON.stringify({message:"invalid or incomplete fields", errors }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    await generatePdf(formData);


    return new Response("PDF generated successfully", { status: 200 });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}











