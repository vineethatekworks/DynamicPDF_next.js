import { requireAuth } from "../../../../../../lib/middleware/requireAuth.ts";
import { generatePdf } from "../../../../utils/pdfgenerator.ts";
import { prisma } from "../../../../../../lib/prisma.ts";
import { uploadAndGetPdfUrl } from "../../../../utils/uploadtos3.ts";


  export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    // Step 1: Authentication Check
    const authResult = await requireAuth(req);
    if (authResult instanceof Response) return authResult;

    const userId = authResult.user.userId;

    // Ensure params is awaited before using its properties
    const formId = context.params.id;

    // Step 2: Fetch Form Data from Database
    const formData = await prisma.formData.findUnique({ where: { id: formId } });

    if (!formData) {
      return new Response("Form not found", { status: 404 });
    }

    // Step 3: Authorization Check
    if (formData.nominatedById !== userId) {
      return new Response("Unauthorized to access this form", { status: 403 });
    }
    // Step 5: Generate the PDF (assuming this generates a Buffer)
    const pdfBuffer = await generatePdf(formData);

    // Step 6: Upload PDF to S3 and get the URL
    const pdfUrl = await uploadAndGetPdfUrl(pdfBuffer, formId);

    // Step 7: Return the URL as a response
    return new Response(
      JSON.stringify({ message: "PDF generated successfully", pdfUrl }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
